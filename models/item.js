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

const Item = mongoose.model("Item", ItemSchema);
module.exports = { Item };
