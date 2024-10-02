// Import statements using ES module syntax
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { WebSocketActions } from "./constants.js"; // Make sure to use .js if it's a JavaScript file

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("sendMessage", (message) => {
    io.emit("message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on(WebSocketActions.UPDATE_LOCATION, (location) => {
    console.log("Received location", location);
    io.emit(WebSocketActions.UPDATE_LOCATION, location);
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
