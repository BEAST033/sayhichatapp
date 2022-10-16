const Message = require("../models/Message");

module.exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    await Message.create({
      message,
      users: [from, to],
      sender: from,
    });
    res.status(201).send({
      status: "success",
      data: "Message added successfully",
    });
  } catch (err) {
    res.status(400).send({
      status: "fail",
      data: "Failed to add message",
    });
  }
};
module.exports.getAllMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({ users: { $all: [from, to] } }).sort(
      "createdAt"
    );
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
      };
    });
    res.status(200).send({
      status: "success",
      data: {
        messages: projectedMessages,
      },
    });
  } catch (err) {
    res.status(404).send({
      status: "fail",
      message: err.message,
    });
  }
};
