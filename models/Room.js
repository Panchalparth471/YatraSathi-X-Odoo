const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    mechanicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roomId: {
        type: String,
        unique: true,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);