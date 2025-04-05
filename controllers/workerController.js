const User = require("../models/User");

exports.getWorkersByOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;

    // Check if owner exists and is a Mechanic
    const owner = await User.findById(ownerId);
    if (!owner || owner.accountType !== "Mechanic") {
      return res.status(404).json({
        success: false,
        message: "Mechanic (owner) not found.",
      });
    }

    // Find all workers linked to this owner
    const workers = await User.find({
      accountType: "Worker",
      owner: ownerId,
    }).select("-password -token"); // Exclude sensitive fields

    return res.status(200).json({
      success: true,
      message: `Found ${workers.length} worker(s) under this mechanic.`,
      data: workers,
    });
  } catch (error) {
    console.error("Error fetching workers:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching workers.",
      error: error.message,
    });
  }
};

exports.getFreeWorkers = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;

    // Check if owner exists and is a Mechanic
    const owner = await User.findById(ownerId);
    if (!owner || owner.accountType !== "Mechanic") {
      return res.status(404).json({
        success: false,
        message: "Mechanic (owner) not found.",
      });
    }

    // Find workers with status = 'Free' under this owner
    const freeWorkers = await User.find({
      accountType: "Worker",
      owner: ownerId,
      status: "Free",
    }).select("-password -token"); // Exclude sensitive fields

    return res.status(200).json({
      success: true,
      message: `Found ${freeWorkers.length} free worker(s) under this mechanic.`,
      data: freeWorkers,
    });
  } catch (error) {
    console.error("Error fetching free workers:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching free workers.",
      error: error.message,
    });
  }
};
