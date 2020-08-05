const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);
module.exports = { Post };
