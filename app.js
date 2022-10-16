const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");

const app = express();

var corsOptions = {
  origin: "https://cheerful-speculoos-979ad9.netlify.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

module.exports = app;
