// express server
const express = require("express");
const router = express.Router();

const { mongoose } = require("../db/mongoose");
const { User } = require("../models/user");
const { Post } = require("../models/post");
const { registrationSchema, updateSchema } = require("../Auth.js");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

const session = require("express-session");

const bcrypt = require("bcryptjs");


const bodyParser = require("body-parser");
router.use(bodyParser.json());

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

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

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


const hashPassword = async (key, user, req) =>
  await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body[key], salt, (err, hash) => {
        console.log(key, "->", hash)
        resolve(hash);
      })
      // TODO - add if (err) return reject(err)
    })
  });

/* Route to edit user information 
   Returns the updated user model

*/
router.patch("/:id", multipartMiddleware, (req, res) => {
  const id = req.params.id;
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }

  if (req.body.password === req.body.confirm_password) {
    User.findOne(
      { _id: id },
      // { $set: fieldsToUpdate },
      // { new: true, useFindAndModify: false, runValidators: true }
    )
      .then(async (user) => {
        if (!user) {
          res.status(404).send("Resource not found");
        } else {
          console.log("user before change", user)
          // map user changes
          for (let key in req.body) {
            if (!!req.body[key]) {
              console.log(String(key))
              if (String(key) === 'password' || String(key) === 'confirm_password') {
                user[key] = await hashPassword(key, user, req);
              } else {
                user[key] = req.body[key];
              }
            }
          }

          console.log("new user", user);

          const updateFieldsYup = updateSchema.cast(user);
          updateSchema.validate(updateFieldsYup).then((good) => {

            user.save().then(updatedUser => {
              console.log("updated user", updatedUser)
              res.json({ currentUser: updatedUser });
            })
          }).catch((e) => {
            res.status(400).send("Invalid Form");
          });
        }
      })
      .catch((error) => {
        res.status(400).send("Bad Request");
      });

  } else {
    res.status(417).send("Passwords do not match");
  }
});

/* Route to delete a user
   Returns the deleted user

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

module.exports = router;
