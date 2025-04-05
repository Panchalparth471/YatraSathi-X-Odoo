const ServiceRequest = require('../models/Requests');
const User = require('../models/User'); // Assuming Worker is part of the User model

// Assign request to a specific worker (if they are free)
exports.assignRequestToSpecificWorker = async (req, res) => {
  try {
    const { requestId, workerId } = req.params;

    // 1. Find the worker and check if they are free
    const worker = await User.findOne({
      _id: workerId,
      accountType: 'Worker',
      status: 'free',
    });

    if (!worker) {
      return res.status(400).json({
        success: false,
        message: 'Worker not found or not available.',
      });
    }

    // 2. Assign the request to the worker
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      requestId,
      { assignedWorker: workerId },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: 'Request not found.',
      });
    }

    // 3. Update worker status to busy
    worker.status = 'busy';
    await worker.save();

    res.status(200).json({
      success: true,
      message: 'Request successfully assigned to the worker.',
      assignedWorker: worker,
      updatedRequest,
    });
  } catch (error) {
    console.error('Error assigning request to worker:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while assigning request.',
      error: error.message,
    });
  }
};



// Get all tasks assigned to a specific worker
exports.getAssignedTasks = async (req, res) => {
  try {
    const { workerId } = req.params;

    // Find all requests assigned to this worker
    const assignedTasks = await ServiceRequest.find({ assignedWorker: workerId })
      .populate('VehicleDetails')
      .populate('Location')
      .populate('MechanicDetails');

    res.status(200).json({
      success: true,
      message: 'Assigned tasks fetched successfully.',
      assignedTasks,
    });
  } catch (error) {
    console.error('Error fetching assigned tasks:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching assigned tasks.',
      error: error.message,
    });
  }
};
