const ServiceRequest = require('../models/Requests');

// Create a new service request
exports.sendRequest = async (req, res) => {
    try {
        const { userId, mechanicId, issueDescription, location } = req.body;

        const newRequest = new ServiceRequest({
            userId,
            mechanicId,
            issueDescription,
            location,
            status: 'Pending'
        });

        await newRequest.save();
        res.status(201).json({ message: 'Service request sent successfully', request: newRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error sending request', error: error.message });
    }
};

// Get all service requests for a mechanic
exports.getRequestLists = async (req, res) => {
    try {
        const { mechanicId } = req.params;
        const requests = await ServiceRequest.find({ mechanicId });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error: error.message });
    }
};

// Accept a service request
exports.acceptRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const updatedRequest = await ServiceRequest.findByIdAndUpdate(
            requestId,
            { status: 'Accepted' },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Service request not found' });
        }

        res.status(200).json({ message: 'Request accepted successfully', request: updatedRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting request', error: error.message });
    }
};

// Reject a service request
exports.rejectRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const deletedRequest = await ServiceRequest.findByIdAndDelete(requestId);

        if (!deletedRequest) {
            return res.status(404).json({ message: 'Service request not found' });
        }

        res.status(200).json({ message: 'Request rejected and deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting request', error: error.message });
    }
};
