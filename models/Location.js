const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Connects to User model
        required: true,
        unique: true, // Each user has one location
    },
    coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" }, // GeoJSON format
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
});

// Create a 2dsphere index for geospatial queries
locationSchema.index({ coordinates: "2dsphere" });

module.exports = mongoose.model("Location", locationSchema);