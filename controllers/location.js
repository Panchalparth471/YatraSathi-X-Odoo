const Location = require("../models/Location");
const User = require("../models/User");

exports.updateLocation = async (req, res) => {
    try {
        const { userId, latitude, longitude } = req.body;

        if (!userId || !latitude || !longitude) {
            return res.status(400).json({ success: false, message: "User ID, Latitude & Longitude are required!" });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Update or create location
        let location = await Location.findOneAndUpdate(
            { user: userId },
            { coordinates: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] } },
            { new: true, upsert: true } // Upsert: Create if doesn't exist
        );

        res.status(200).json({ success: true, location });
    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.getNearbyMechanics = async (req, res) => {
    try {
        const { latitude, longitude, radius = 5000 } = req.query; // Default 5km radius

        if (!latitude || !longitude) {
            return res.status(400).json({ success: false, message: "Latitude & Longitude are required!" });
        }

        // Find locations near the user
        const nearbyLocations = await Location.find({
            coordinates: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                    $maxDistance: parseInt(radius), // Radius in meters
                },
            },
        }).populate("user", "firstName lastName email accountType");

        // Filter only mechanics
        const mechanics = nearbyLocations
            .map(loc => loc.user)
            .filter(user => user.accountType === "Mechanic");

        res.status(200).json({ success: true, mechanics });
    } catch (error) {
        console.error("Error fetching nearby mechanics:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};