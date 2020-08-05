// express server
const express = require("express");
const app = express();

// moment module for post creation date
//const moment = require("moment");

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
const {
  default: ViewUsers,
} = require("./client/src/components/SettingsAdmin/ViewUsers");
app.use(bodyParser.urlencoded({ extended: true }));

/****************** API ROUTES ************************/

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
