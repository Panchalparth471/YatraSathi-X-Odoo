const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const database = require("./config/database.js");
const routes = require("./routes/routes.js");
const http = require("http"); // Required for Socket.io
const { Server } = require("socket.io"); // Import correct Socket.IO Server class
const socketHandler = require("./sockets/socketHandler"); // Import socket logic
require("dotenv").config();

// Initialize express
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app); // Create an HTTP server for Socket.io

// Initialize Socket.IO and enable CORS
const io = new Server(server, { 
    cors: { 
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Store io instance globally in the app
app.set("io", io);

// Middleware
app.use(express.json());
app.use("/api/v1", routes);

// Home route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server Started Successfully",
    });
});

// Connect to Database
database.connect();

// Initialize WebRTC & Socket.io
socketHandler(io);

// Start server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
