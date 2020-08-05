const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
  name: {
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
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };
