const Room = require("../models/Room");
const User = require("../models/User");

exports.createRoom = async (req, res) => {
    try {
        const { userId, mechanicId } = req.body;

        if (!userId || !mechanicId) {
            return res.status(400).json({ success: false, message: "Both userId and mechanicId are required." });
        }

        // Validate user and mechanic
        const user = await User.findById(userId);
        const mechanic = await User.findById(mechanicId);

        if (!user || !mechanic) {
            return res.status(404).json({ success: false, message: "User or Mechanic not found." });
        }

        if (mechanic.accountType !== "Mechanic") {
            return res.status(400).json({ success: false, message: "Selected person is not a mechanic." });
        }

        // Check if an active room already exists
        let room = await Room.findOne({ userId, mechanicId });

        if (!room) {
            room = await Room.create({ userId, mechanicId, roomId: `${userId}-${mechanicId}` });
        }

        return res.status(200).json({ success: true, message: "Call room created successfully.", room });
    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.startCall = async (req, res) => {
    try {
        const { roomId } = req.body;

        if (!roomId) {
            return res.status(400).json({ success: false, message: "Room ID is required to start the call." });
        }

        // Find if the room exists
        const room = await Room.findOne({ roomId });

        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found." });
        }

        // Emit event to start the call via Socket.IO
        const io = req.app.get("io");  
        if (!io) {
            return res.status(500).json({ success: false, message: "Socket.IO not initialized." });
        }

        io.to(roomId).emit("startCall", { message: "Call started." });

        return res.status(200).json({ success: true, message: "Call started successfully." });
    } catch (error) {
        console.error("Error starting call:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.endCall = async (req, res) => {
    try {
        const { roomId } = req.body;

        if (!roomId) {
            return res.status(400).json({ success: false, message: "Room ID is required to end the call." });
        }

        // Find if the room exists
        const room = await Room.findOne({ roomId });

        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found." });
        }

        // Emit event to notify both users that the call has ended
        const io = req.app.get("io");
        if (!io) {
            return res.status(500).json({ success: false, message: "Socket.IO not initialized." });
        }

        io.to(roomId).emit("endCall", { message: "Call ended." });

        return res.status(200).json({ success: true, message: "Call ended successfully." });
    } catch (error) {
        console.error("Error ending call:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};