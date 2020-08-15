// express server
const express = require("express");
const router = express.Router();

const { mongoose } = require("../db/mongoose");
const { User } = require("../models/user");
const { Post } = require("../models/post");
const { registrationSchema } = require("../Auth.js");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

const bodyParser = require("body-parser");
router.use(bodyParser.json({ limit: "50mb" }))

router.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "good-neighbour",
  api_key: "246527538834138",
  api_secret: "dIApzPK2RndvFgqHMFXYht4y7A8",
});
/*
  POST request to login a given user.

  Body:
  {
    email: <email>,
    password: <password>
  }

  ON SUCCESS: 
  The response returned contains all the information stored on the
  database about the logged in user.
*/
router.post("/login", async (req, res) => {
  User.findByEmailPassword(req.body.email, req.body.password)
    .then((user) => {
      req.session.user = user._id;

      user
        .populate({
          path: "active_post",
          model: "Post",
          populate: { path: "author", model: "User" },
        })
        .execPopulate()
        .then((populatedUser) => {
          res.json({ currentUser: populatedUser });
        });
    })
    .catch((e) => {
      res.sendStatus(400);
    });
});


/*
  GET request to logout a given user.
*/
router.get("/logout", (req, res) => {
  // Remove the session
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

/*
  Route to check if a user is logged in on the session cookie.
*/
router.get("/check-session", (req, res) => {
  if (req.session.user) {
    User.findById(req.session.user)
      .then((user) => {
        if (!user) {
          res.status(404).send("Resource not found");
        } else {
          user
            .populate({
              path: "active_post",
              model: "Post",
              populate: { path: "author", model: "User" },
            })
            .execPopulate()
            .then((populatedUser) => {
              res.json({ currentUser: populatedUser });
            });
        }
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  } else {
    res.status(401).send();
  }
});


/*
  GET route to get all the users in the database. Only logged
  in users who are admins should be allowed to make this request.

  ON SUCCESS:
  Return the information about all the users in the database
*/
router.get("/", (req, res) => {

  if (!req.session.user) {
    res.sendStatus(401);
  } else {
    // Find the user from the database
    User.findById(req.session.user)
      .then((user) => {
        if (!user) {
          // If the user is not a valid user
          res.sendStatus(400)
        } else if (!user.admin) {
          // Only admins can get the data of all users
          res.sendStatus(403)
        } else {
          // Return all the users
          User.find()
            .then((users) => {
              res.json(users);
            })
            .catch((e) => {
              res.sendStatus(500);
            });
        }
      })
      .catch((error) => {
        res.sendStatus(404);
      })

  }

});

/*
  GET request to get the information about a user with the
  given id. Only logged in users can make this request to
  their own ids. Other users (excluding admins) cannot make
  this request.

  ON SUCCESS:
  Return the information stored in the database about the user
*/
router.get("/:id", (req, res) => {
  const id = req.params.id;

  // Confirm if the user is logged in
  const curr_user = req.session.user;

  // Get the current user from the database.
  User.findById(curr_user)
    .then((curr) => {
      if (!curr) {
        res.sendStatus(401)
      } else if (req.session.user === curr.id || curr.admin) {
        User.findById(id)
          .then((user) => {
            if (!user) {
              res.status(404).send("Resource not found");
            } else {
              res.send(user);
            }
          })
          .catch((error) => {
            res.status(500).send("Internal Server Error");
          });
      } else {
        res.sendStatus(403);
      }
    })
    .catch((error) => {
      res.sendStatus(404)
    })
});


/*
  POST request to register a new user onto the website.

  BODY:
  {
    first_name: <first name>,
    last_name: <last name>,
    email: <email>,
    password: <password>,
    password_confirmation: <password>,
  }

  ON SUCCESS:
  Return the information stored in the database about the user
*/
router.post("/", (req, res) => {
  const yupRegister = registrationSchema.cast({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  });

  if (req.body.password === req.body.password_confirmation) {
    registrationSchema
      .validate(yupRegister)
      .then((good) => {
        const newUser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          profile_picture:
            "https://res.cloudinary.com/good-neighbour/image/upload/v1597314358/no-profile-pic_edm3bf.jpg",
        });

        newUser.save().then((user) => {
          res.json({ currentUser: user });
        });
      })
      .catch((e) => {
        res.status(400).send("Invalid Form");
      });
  } else {
    res.status(417).send("Bad Password");
  }
});


/*
  PUT request to promote a given user to admin role. Only logged
  in admins are permitted to make this request

  BODY:
  {
    "email": <email of the user to promote>
  }

  ON SUCCESS:
  Return the information stored in the database about the promoted
  user.
*/
router.put("/", (req, res) => {
  const curr_user = req.session.user;

  User.findById(curr_user)
    .then((curr) => {
      if (!curr.admin) {
        res.sendStatus(401)
      } else {
        User.findOne({ email: req.body.email })
          .then((user) => {
            if (!user) {
              res.sendStatus(404);
            } else {
              if (user.admin) {
                res.status(400).send("Bad Request");
              } else {
                user.admin = true;
                user.save().then((u) => {
                  User.find().then((users) => {
                    res.json(users);
                  });
                });
              }
            }
          })
          .catch((e) => {
            res.sendStatus(500);
          });
      }
    })
    .catch((error) => {
      res.sendStatus(401);
    })

});

/*
  PATCH request to edit information about a user. Only logged
  in users can edit their own profiles. All fields are optional
  and only those attributes that are provided are updated.
 
  BODY:
  {
    "first_name": <first name> (optional),
    "last_name": <lastt name> (optional),
    "email": <email> (optional),
    "password": <password> (optional),
  }

  ON SUCCESS:
  Return the updated information stord in the database
*/
router.patch("/:id", multipartMiddleware, (req, res) => {
  const id = req.params.id;
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }

  const curr_user = req.session.user;
  if (curr_user !== id) {
    res.sendStatus(401);
  } else {
    fieldsToUpdate = {};
    for (let key in req.body) {
      if (req.body[key] !== "") {
        fieldsToUpdate[key] = req.body[key];
      }
    }

    User.findOneAndUpdate(
      { _id: id },
      { $set: fieldsToUpdate },
      { new: true, useFindAndModify: false, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).send("Resource not found");
        } else {
          res.json({ currentUser: user });
        }
      })
      .catch((error) => {
        res.status(400).send("Bad Request");
      });
  }

});

/* 
  DELETE request to delete a user with the given id. Only admins
  can delete users.

  ON SUCCESS:
  Return all the users in the database except the deleted user
*/
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const curr_user = req.session.user;

  User.findById(curr_user)
    .then((curr) => {
      if (!curr.admin) {
        res.sendStatus(401)
      } else {
        User.findByIdAndRemove(id)
          .then((user) => {
            if (!user) {
              res.status(404).send();
            } else {
              User.find().then((users) => {
                res.json(users);
              });
            }
          })
          .catch((error) => {
            res.status(500).send();
          });
      }
    })
    .catch((error) => {
      res.sendStatus(401);
    })

});

router.post("/image/:id", async (req, res) => {
  const file = req.body.data;
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found");
      } else {
        cloudinary.uploader
          .upload(file, {
            upload_preset: "ml_default",
          })
          .then((uploadedResponse) => {
            user.profile_picture = uploadedResponse.secure_url;
            user.save();
            user
              .populate({
                path: "active_post",
                model: "Post",
                populate: { path: "author", model: "User" },
              })
              .execPopulate()
              .then((populatedUser) => {
                res.json({ currentUser: populatedUser });
              });
          })
          .catch((error) => {
            res.status(500).send("Internal Server Error!");
          });
      }
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error!");
    });
});

module.exports = router;
