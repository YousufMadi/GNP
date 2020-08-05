// express server
const express = require("express");
const app = express();

// Moment module for post creation
//const moment = require("moment")

// mongoose and mongo models
const { mongoose } = require("./db/mongoose");
const { Post } = require("./models/post");
const { User } = require("./models/user");
const { Item } = require("./models/item");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

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

/* Route to create a new user
  BODY FORMAT: 
  {
    email,
    password,
    profile_picture,
    admin,
    name
  }
  Returns the new user created
*/
app.post("/users", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profile_picture: req.body.profile_picture,
    admin: req.body.admin,
  })
    .then((user) => {
      res.json(user);
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

/* Route to edit user information
   Returns the updated user model
*/
app.patch("/users/:id", (req, res) => {});

// POST ROUTES

/* Route to retrieve all users 
   Returns the list of users in the database.

   TODO: For scalability maybe only send those in same country
*/
app.get("/posts", (req, res) => {
  Post.find()
    .populate("user")
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
    email,
    password,
    profile_picture,
    admin,
    name
  }
  Returns the new user created
*/
app.post("/posts", (req, res) => {
  Post.create({})
    .then((post) => {
      res.json(post);
    })
    .catch((e) => {
      res.sendStatus(500);
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
