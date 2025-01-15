const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const redis = require("./client.js");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/rooms/:username", async (req, res) => {
  try {
    const rooms = await redis.lrange(`chat:${req.params.username}`, 0, -1);
    res.json(rooms);
  } catch (err) {
    console.error("Error retrieving rooms:", err);
    res.status(500).send("Error retrieving rooms");
  }
});

app.get("/chat/:room", async (req, res) => {
  try {
    const chatHistory = await redis.lrange(`chat:${req.params.room}`, 0, -1);
    res.json(chatHistory.map((msg) => {
      try {
        return JSON.parse(msg);
      } catch (err) {
        console.error("Invalid message format:", msg);
        return null; // Skip invalid messages
      }
    }).filter(Boolean)); // Filter out null values
  } catch (err) {
    console.error("Error retrieving chat history:", err);
    res.status(500).send("Error retrieving chat history");
  }
});

// Socket.IO Events
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Join Room
  socket.on("join_room", async (data) => {
    try {
      const { username, roomName } = data;
      if (!username || !roomName) {
        console.error("Invalid join_room data:", data);
        return;
      }
      socket.join(roomName);

      // Add the room to the user's room list in Redis (if not already present)
      const existingRooms = await redis.lrange(`chat:${username}`, 0, -1);
      if (!existingRooms.includes(roomName)) {
        await redis.rpush(`chat:${username}`, roomName);
      }

      console.log(`User ${username} with socket ID: ${socket.id} joined room: ${roomName}`);
    } catch (err) {
      console.error("Error joining room:", err);
    }
  });

  // Send Message
  socket.on("send_message", async (data) => {
    try {
      const { room, author, message, time } = data;
      if (!room || !author || !message) {
        console.error("Invalid message data:", data);
        return;
      }

      // Emit message to others in the room
      socket.to(room).emit("receive_message", data);

      // Save the message to Redis
      await redis.rpush(`chat:${room}`, JSON.stringify(data));
      console.log("Message saved:", data);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  // Disconnect Event
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Start Server
server.listen(3001, () => {
  console.log("SERVER RUNNING on port 3001");
});
