const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// // create an image schema
// const imageSchema = mongoose.Schema({
//   image_url: {
//     type: String,
//     required: true
//   },
//   created_at: String
// });

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Not valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  first_name: {
    type: String,
    required: true,
    minlength: 1,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 1,
  },
  active_post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null,
  },
  profile_picture: {
    type: String,
    default: null,
  },
  rating: {
    type: Number,
    default: 5,
  },
  address: {
    type: Object,
    default: null,
  },
});

// Middleware to hash password on the create.
UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// Static method for finding a user by their credentials,
// rejects if no user found by that email or password does not match
UserSchema.statics.findByEmailPassword = function (email, password) {
  const User = this;
  return User.findOne({ email: email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
