// express server
const express = require("express");
const app = express();

// Moment module for post creation
const moment = require("moment");

// mongoose and mongo models
const { mongoose } = require("./db/mongoose");
const { Post } = require("./models/post");
const { User } = require("./models/user");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling ***/

app.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000,
      httpOnly: true,
    },
  })
);

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
    profile_picture, -> TO BE ADDED
    admin -> MAYBE SHOULDN'T BE HERE
  }
  Returns the new user created

  TODO: POST VALIDATION
*/
app.post("/users", (req, res) => {
  const newUser = new User({
    // name: req.body.name,
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
    },
    (e) => {
      res.sendStatus(400);
    }
  );
});

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
app.patch("/users/:id", (req, res) => {
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
  Post.find()
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(transaction);
      }
    });
});

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
    author: req.body.author,
    reimbursement: req.body.reimbursement,
    description: req.body.description,
    time: moment(),
    items: req.body.items,
  })
    .then((post) => {
      res.json(post);
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

/* Route to edit a post
   Returns the updated post

   TODO: Everything
*/
app.patch("/posts/:id", (req, res) => {});

/* Route to delete a post
   Returns the deleted post

   TODO: Everything
*/
app.delete("/posts/:id", (req, res) => {});
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
