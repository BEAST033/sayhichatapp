require("dotenv").config({ path: `${__dirname}/config.env` });
const mongoose = require("mongoose");
const socket = require("socket.io");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception");
  console.log("Error Name: " + err.name);
  console.log("Error Message: " + err.message);
  process.exit(1);
});

const app = require("./app");

const db = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
).replace("<dbname>", process.env.DATABASE_NAME);

mongoose
  .connect(db)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("DB connection unsuccessful");
    console.log("Error Name: " + err.name);
    console.log("Error Message: " + err.message);
    server.close(() => {
      process.exit(1);
    });
  });

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection");
  console.log("Error Name: " + err.name);
  console.log("Error Message: " + err.message);
  server.close(() => {
    process.exit(1);
  });
});

const io = socket(server, {
  cors: {
    origin: "https://cheerful-speculoos-979ad9.netlify.app",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
