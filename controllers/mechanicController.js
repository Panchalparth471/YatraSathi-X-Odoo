const User = require('../models/User');
const MechanicDetail = require('../models/MechanicDetail');

const createMechanic = async (req, res) => {
    try {
        const { userId, ...mechanicData } = req.body;

        // Step 1: Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found, please create an account." });
        }

        // Step 2: Check if user is a mechanic
        if (user.accountType !== "Mechanic") {
            return res.status(403).json({ message: "Not authorized to create mechanic details." });
        }

        // Step 3: Create MechanicDetail
        const mechanic = new MechanicDetail(mechanicData);
        await mechanic.save();

        // Step 4: Update user model with MechanicDetail reference
        user.MechanicDetail = mechanic._id;
        await user.save();

        res.status(201).json({ message: "Mechanic details added successfully", mechanic });
    } catch (error) {
        res.status(500).json({ message: "Error adding mechanic details", error: error.message });
    }
};

// Get all mechanic details
const getAllMechanics = async (req, res) => {
    try {
        const mechanics = await MechanicDetail.find();
        res.status(200).json(mechanics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching mechanic details", error: error.message });
    }
};

// Get mechanic detail by ID
const getMechanicById = async (req, res) => {
    try {
        const mechanic = await MechanicDetail.findById(req.params.id);
        if (!mechanic) return res.status(404).json({ message: "Mechanic not found" });
        res.status(200).json(mechanic);
    } catch (error) {
        res.status(500).json({ message: "Error fetching mechanic", error: error.message });
    }
};

// Update mechanic detail
const updateMechanic = async (req, res) => {
    try {
        const updatedMechanic = await MechanicDetail.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMechanic) return res.status(404).json({ message: "Mechanic not found" });
        res.status(200).json({ message: "Mechanic updated successfully", updatedMechanic });
    } catch (error) {
        res.status(500).json({ message: "Error updating mechanic", error: error.message });
    }
};

// Delete mechanic detail
const deleteMechanic = async (req, res) => {
    try {
        const deleted = await MechanicDetail.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Mechanic not found" });
        res.status(200).json({ message: "Mechanic deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting mechanic", error: error.message });
    }
};

module.exports = {
    createMechanic,
    getAllMechanics,
    getMechanicById,
    updateMechanic,
    deleteMechanic
};
