const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
});

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reimbursement: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minlength: 1,
    default: "",
  },
  time: {
    type: String,
    required: true,
    minlength: 1,
  },
  items: {
    type: [ItemSchema],
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = { Post };
