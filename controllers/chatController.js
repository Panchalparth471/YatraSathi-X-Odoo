const Chat = require("../models/Chat");

// Save message to DB
exports.sendMessage = async (req, res) => {
  try {
    const { roomId, senderId, message } = req.body;

    if (!roomId || !senderId || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newMessage = await Chat.create({ roomId, senderId, message });

    return res.status(201).json({ success: true, message: "Message sent", chat: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all messages in a room
exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!roomId) {
      return res.status(400).json({ success: false, message: "Room ID is required" });
    }

    const messages = await Chat.find({ roomId }).sort({ timestamp: 1 });

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};