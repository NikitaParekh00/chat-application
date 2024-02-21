// Import dependencies
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"));

// Socket.io
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat messages
  socket.on("chat message", (msg) => {
    console.log("connected");
    io.emit("chat message", msg); // Broadcast message to all connected clients
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
