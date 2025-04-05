const Message = require("../models/Message"); // Import Message model

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Join Room
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        });

        // WebRTC Signaling (Offer & Answer)
        socket.on("offer", (data) => {
            io.to(data.roomId).emit("offer", data.offer);
        });

        socket.on("answer", (data) => {
            io.to(data.roomId).emit("answer", data.answer);
        });

        socket.on("ice-candidate", (data) => {
            io.to(data.roomId).emit("ice-candidate", data.candidate);
        });

        // Messaging - Store messages in DB
        socket.on("sendMessage", async (data) => {
            const { roomId, senderId, message } = data;

            try {
                const newMessage = await Message.create({ roomId, senderId, message });

                // Emit message to the room
                io.to(roomId).emit("receiveMessage", newMessage);
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });

        // Handle Disconnection
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};