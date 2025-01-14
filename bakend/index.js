const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

// Enable CORS for the frontend
app.use(cors({
  origin: "*", // Frontend URL
  methods: ["GET", "POST"],
  
}));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server with proper CORS configuration
const io = new Server(server, {
  cors: {
    origin: "*", // Frontend URL
    methods: ["GET", "POST"],
   
  },
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Join room event
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  // Send message event
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("Message sent to room:", data.room, "Data:", data);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`SERVER RUNNING on port ${PORT}`);
});
