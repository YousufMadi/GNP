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
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "5mb" }))

// express-session for managing user sessions
const session = require("express-session");

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

// yup validation
const { registrationSchema } = require("./Auth");

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "good-neighbour",
  api_key: "246527538834138",
  api_secret: "dIApzPK2RndvFgqHMFXYht4y7A8",
});

// app.use(bodyParser.urlencoded({ extended: true }));

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

app.use("/users", require("./Routes/userRoutes"));
app.use("/posts", require("./Routes/postRoutes"));


/*** Session handling ***/



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
