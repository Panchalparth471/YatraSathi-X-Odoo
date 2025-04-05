const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('VehicleDetails')
      .populate('Requests')
      .populate('MechanicDetail');

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ message: "All users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

module.exports = { getAllUsers };
