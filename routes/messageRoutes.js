const {
  getAllMessages,
  addMessage,
} = require("../controllers/messageController");

const router = require("express").Router();

router.post("/", addMessage);
router.post("/get-messages", getAllMessages);

module.exports = router;
