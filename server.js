//import { registrationSchema } from './client/src/components/Auth/Auth';

// express server
const express = require("express");
const app = express();

// Moment module for post creation
const moment = require("moment");

// mongoose and mongo models
const { mongoose } = require("./db/mongoose");
const { Post } = require("./models/post");
const { User } = require("./models/user");
const { Image } = require("./models/image");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

// yup validation
const { registrationSchema } = require("./Auth");

// get distance function
const { getDistance, convertDistance } = require("geolib");

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "good-neighbour",
  api_key: "246527538834138",
  api_secret: "dIApzPK2RndvFgqHMFXYht4y7A8",
});

app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling ***/

app.use(
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

app.post("/image/:id", async (req, res) => {
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
            console.log(uploadedResponse);
            user.profile_picture = uploadedResponse.secure_url;
            user.save();
            res.sendStatus(200);
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

/* Route to login, creates a session
   BODY FORMAT:
   {
     email,
     password
   }
   Returns the user if credentials are correct
*/
app.post("/users/login", async (req, res) => {
  User.findByEmailPassword(req.body.email, req.body.password)
    .then((user) => {
      req.session.user = user._id;
      // req.session.email = user.email;

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

app.get("/users/logout", (req, res) => {
  // Remove the session
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

// A route to check if a use is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
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
        res.status(500).send("Internal Server Error"); // server error
      });
  } else {
    res.status(401).send();
  }
});

/****************** API ROUTES ************************/
// USER ROUTES

/* Route to retrieve all users 
   Returns the list of users in the database.

   TODO: Decide if we want to send encrypted passwords to client
*/

app.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

app.get("/users/:id", (req, res) => {
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
      res.status(500).send("Internal Server Error"); // server error
    });
});

/* Route to create a new user
  BODY FORMAT: 
  {
    name,
    email,
    password,
    confirmPassword,
    profile_picture, -> TO BE ADDED
    admin -> MAYBE SHOULDN'T BE HERE
  }
  Returns the new user created

  TODO: POST VALIDATION
*/
app.post("/users", (req, res) => {
  const yupRegister = registrationSchema.cast({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  });

  if (req.body.password === req.body.password_confirmation) {
    registrationSchema.validate(yupRegister).then((good) => {

      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        // profile_picture: req.body.profile_picture,
        // admin: req.body.admin,
      });

      newUser.save().then(
        (user) => {
          /* THIS IS CAUSING ERROR. WHY?
        req.session.user = user._id;
        req.session.email = user.email; */
          res.json({ currentUser: user });
        }
      );
    }).catch((bad) => {
      console.log(bad.errors);
      console.log("Invalid Forms")
      res.status(400).send("Invalid Form");
    });
  } else {
    res.status(417).send("Bad Password")
  }
}
);

/* Route to make a user an admin using email passed
   in the body of the request

   Returns the new list of users
*/
app.put("/users", (req, res) => {
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

/* Route to edit user information 
   Returns the updated user model

*/
app.patch("/users/:id", multipartMiddleware, (req, res) => {
  const id = req.params.id;
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }

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
});

/* Route to delete a user
   Returns the deleted user

*/
app.delete("/users/:id", (req, res) => {
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

// POST ROUTES

/* Route to retrieve all users 
   Returns the list of users in the database.

   TODO: For scalability maybe only send those in same country
   TODO: DO NOT SEND PASSWORD TO CLIENT WHEN POPULATING AUTHOR
*/
app.get("/posts", (req, res) => {
  Post.find({ completed: false })
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(transaction);
      }
    });
});

/*Route to retrieve posts with certain criteria
  Returns the list of posts that satisfy filter critera.
*/
app.get("/posts/:id", (req, res) => {
  const currentUser = req.params._id;
  const userLocation = req.body.currLocation;
  const distance = req.body.distance;
  const reimbursement = req.body.reimbursement;
  const size = req.body.size;

  Post.find({ completed: false })
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const paymentFilter = transaction.filter((post) => post.reimbursement === reimbursement);
        // console.log(paymentFilter);
        const sizeFilter = paymentFilter.filter((post) => sizeEstimate(post) === size);
        // console.log(sizeFilter);
        // sizeFilter.forEach((post) => console.log(userLocation.location.lat));
        const distFilter = sizeFilter.filter((post) => {
          return (
            convertDistance(
              getDistance(
                {
                  latitude: userLocation.lat,
                  longitude: userLocation.lng
                },
                {
                  latitude: post.location.lat,
                  longitude: post.location.lng
                }
              ), "km"
            ) < Number(distance)
          );
        });
        res.json(distFilter)
      }
    });

});

const sizeEstimate = (post) => {
  let size = null;
  if (post.items.length <= 3) {
    size = "Small";
  } else if (post.items.length <= 8) {
    size = "Medium";
  } else {
    size = "Large";
  }
  return size;
};

/* Route to create a new post
  BODY FORMAT: 
  {
    author,
    reimbursement,
    description,
    items
  }
  Returns the new user created

  TODO: POST VALIDATION
*/
app.post("/posts", (req, res) => {
  Post.create({
    author: req.body.user,
    reimbursement: req.body.post.reimbursement,
    description: req.body.post.description,
    time: moment(),
    items: req.body.post.items,
    location: req.body.post.location,
    completed: false,
  })
    .then((post) => {
      Post.find({ completed: false })
        .populate("author")
        .exec((err, transaction) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.json(transaction);
          }
        });
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

/* Route to edit a post
   Returns the updated post

   TODO: Everything
*/
app.put("/posts/:id", (req, res) => {
  User.findById(req.body.user)
    .then((user) => {
      Post.findById(req.params.id).then((post) => {
        if (!post) {
          res.sendStatus(404);
        } else {
          if (post.author.toString() === req.body.user) {
            post.description = req.body.post.description;
            post.items = req.body.post.items;
            post.reimbursement = req.body.post.reimbursement;
            post.save().then((p) => {
              Post.find({ completed: false })
                .populate("author")
                .exec((err, transaction) => {
                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.json(transaction);
                  }
                });
            });
          } else {
            res.sendStatus(400);
          }
        }
      });
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

/* Route to delete a post
   Returns the deleted post

   TODO: Everything
*/
app.delete("/posts", (req, res) => {
  User.findById(req.body.user)
    .then((user) => {
      if (!user) {
        res.sendStatus(404);
      } else {
        Post.findById(req.body.post).then((post) => {
          if (!post) {
            res.sendStatus(404);
          } else {
            if (user.admin || post.author.toString() === req.body.user) {
              Post.findByIdAndDelete(req.body.post).then((post) => {
                Post.find({ completed: false })
                  .populate("author")
                  .exec((err, transaction) => {
                    if (err) {
                      res.sendStatus(500);
                    } else {
                      res.json(transaction);
                    }
                  });
              });
            } else {
              res.sendStatus(400);
            }
          }
        });
      }
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

app.put("/posts/accept/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      User.findById(req.body.user).then((user) => {
        if (user) {
          user.active_post = post._id;
          user.save().then((savedUser) => {
            User.findById(savedUser._id)
              .populate({
                path: "active_post",
                model: "Post",
                populate: { path: "author", model: "User" },
              })
              .exec((err, transaction) => {
                if (err) {
                  res.sendStatus(500);
                } else {
                  res.json({ currentUser: transaction });
                }
              });
          });
        } else {
          res.sendStatus(404);
        }
      });
    } else {
      res.sendStatus(404);
    }
  });
});

app.put("/posts/complete/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      post.completed = true;
      post.save().then((savedPost) => {
        User.findById(req.body.user).then((user) => {
          if (user) {
            user.active_post = null;
            user.save().then((savedUser) => {
              Post.find({ completed: false })
                .populate("author")
                .exec((err, transaction) => {
                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.json({ currentUser: savedUser, posts: transaction });
                  }
                });
            });
          } else {
            res.sendStatus(404);
          }
        });
      });
    } else {
      res.sendStatus(404);
    }
  });
});

/****************** WEBPAGE ROUTES ************************/

// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than API routes will go to index.html
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const validRoutes = [
    "/",
    "/feed",
    "/login",
    "/logout",
    "/settings",
    "/admin",
    "/signup",
  ];
  if (!validRoutes.includes(req.url)) {
    // if url not in expected page routes, set status to 404.
    res.status(404);
  }
  // send index.html
  res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
