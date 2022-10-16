const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Type some text in message"],
  },
  users: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
