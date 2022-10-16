const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (await User.findOne({ username })) {
      throw new Error("Username already used");
    } else if (await User.findOne({ email })) {
      throw new Error("Email already used");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    newUser.password = undefined;
    res.status(201).send({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Incorrect username or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect username or password");
    }
    user.password = undefined;
    res.status(200).send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: "fail",
      message: err.message,
    });
  }
};

exports.setAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isAvatarImageSet = true;
    user.avatarImage = req.body.image;
    await user.save();
    user.password = undefined;

    res.status(200).send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id username avatarImage");

    res.status(200).send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).send({
      status: "fail",
      message: err.message,
    });
  }
};
