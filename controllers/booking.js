const socketIo = require("../socket"); // Import the WebSocket instance

exports.confirmBooking = async (req, res) => {
    try {
        const { userId, mechanicId, latitude, longitude } = req.body;

        // Emit event to start tracking
        const io = socketIo.getIO();
        io.emit("confirm-booking", { userId, mechanicId, latitude, longitude });

        return res.status(200).json({ success: true, message: "Booking confirmed" });
    } catch (error) {
        console.error("Booking confirmation error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};