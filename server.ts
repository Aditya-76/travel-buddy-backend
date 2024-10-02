import { Socket } from "socket.io";
import { WebSocketActions } from "./constants";

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("New user connected");

  socket.on("sendMessage", (message) => {
    io.emit("message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on(WebSocketActions.UPDATE_LOCATION, (location) => {
    console.log("Recieved location", location);
    io.emit(WebSocketActions.UPDATE_LOCATION, location);
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
