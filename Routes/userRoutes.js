// express server
const express = require("express");
const router = express.Router();

const { mongoose } = require("../db/mongoose");
const { User } = require("../models/user");
const { Post } = require("../models/post");
const { registrationSchema } = require("../Auth.js");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

const session = require("express-session");

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(express.urlencoded({limit: '1mb'}));

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "good-neighbour",
  api_key: "246527538834138",
  api_secret: "dIApzPK2RndvFgqHMFXYht4y7A8",
});

router.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
      httpOnly: true,
    },
  })
);

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
  GET route to get all the users in the database.

  ON SUCCESS:
  Return the information about all the users in the database
*/
router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

/*
  GET request to get the information about a user with the
  given id.

  PARAMS: id -> get the information of the user with this id

  ON SUCCESS:
  Return the information stored in the database about the user
*/
router.get("/:id", (req, res) => {
  const id = req.params.id;

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
            "https://res.cloudinary.com/good-neighbour/image/upload/v1597524012/no-profile-pic_dqzqam.jpg",
        });

        newUser.save().then((user) => {
          res.json({ currentUser: user });
        });
      })
      .catch(function (err) {
        if (err.errors[0] === 'lastName is a required field') {
          res.sendStatus(418)
        } else if (err.errors[0] === 'firstName is a required field') {
          res.sendStatus(419)
        } else {
          res.status(400).send("Something went wrong");
        }
      });
  } else {
    res.status(417).send("Bad Password");
  }
});


/*
  PUT request to promote a given user to admin role. 

  BODY:
  {
    "email": <email of the user to promote>
  }

  ON SUCCESS:
  Return the information stored in the database about the promoted
  user.
*/
router.put("/", (req, res) => {
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
});

/*
  PATCH request to edit information about a user. All fields are
  optional and only those attributes that are provided are updated.
 
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
  } else {
    User.findById(id)
      .then((user) => {
        for (let key in req.body) {
          if (req.body[key] !== "") {
            user[key] = req.body[key];
          }
        }
        user.save().then((user) => {
          res.json({ currentUser: user });
        });
      })
      .catch((e) => {
        res.status(400).send("Bad Request");
      });
  }
});

/* 
  DELETE request to delete a user with the given id. 
  
  PARAMS: id -> delete the user corresponding to this id

  ON SUCCESS:
  Return all the users in the database except the deleted user
*/
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  // Delete a student by their id
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
});

/*
  Route to assign a profile image to the id of the 
  given user.

  PARAMS: id -> id of the user who's profile pic is being
  updated.

  BODY
  {
    "data": <picture being uploaded>
  }

  ON SUCCESS:
  Update the profile picture

*/ 
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
            res.status(500).send("Internal Server Error!"); // server error
          });
      }
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error!"); // server error
    });
});


module.exports = router;

