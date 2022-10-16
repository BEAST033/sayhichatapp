const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/set-avatar/:id", setAvatar);
router.get("/", getAllUsers);

module.exports = router;