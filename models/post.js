const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  amount: {
    type: Number,
    required: true,
    default: 1,
  },
});

const PostSchema = new mongoose.Schema({
  user: {
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
  },
  time: {
    type: String,
    required: true,
    minlength: 1,
  },
  items: {
    type: [ItemSchema],
    default: [],
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = { Post };
