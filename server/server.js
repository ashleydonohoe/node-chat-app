const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const publicPath = path.join(__dirname, "../public");

const app = express();
const port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.emit("newMessage", {
    from: "admin",
    text: "Welcome to the chat app!"
  });

  socket.broadcast.emit("newMessage", {
    from: "admin",
    text: "New user joined"
  });

  socket.on("createMessage", (newMessage) => {
    console.log("createMessage", newMessage);
    io.emit("newMessage", {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit("newMessage", {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log("Server started on " + port);
});
