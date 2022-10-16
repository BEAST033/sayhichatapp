const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");

const app = express();

// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hiiiiii");
});

app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

module.exports = app;
