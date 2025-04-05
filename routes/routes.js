const express = require("express");
const router = express.Router();
const multer = require("multer");

const { costestimation } = require("../controllers/costestimation");
const mechanicController = require('../controllers/mechanicController');
const { updateLocation, getNearbyMechanics } = require("../controllers/location");
const { confirmBooking } = require("../controllers/booking");
// Setup multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
const {
    signup,
    verifyOtpAndCreateUser,
    login,
    sendResetPasswordOTP,
    verifyOTPAndResetPassword,
  } = require("../controllers/Auth");
  
  const { createRoom ,startCall, endCall} = require("../controllers/callController");
  
  const { sendMessage, getMessages } = require("../controllers/chatController");
const {
    sendRequest,
    getRequestLists,
    acceptRequest,
    rejectRequest
} = require("../controllers/request");
const { getAllUsers } = require("../controllers/user");

// Send service request
router.post('/request', sendRequest);


router.get('/requests/:mechanicId', getRequestLists);

// Accept a request
router.put('/accept-request/:requestId', acceptRequest);

// Reject/delete a request
router.delete('/reject-request/:requestId', rejectRequest);


// Attach multer middleware to the route
router.post("/cost-estimate", upload.array('images', 5), costestimation); // <-- important!

router.post("/login", login);
router.post("/signup", signup);


router.post('/mechanics', mechanicController.createMechanic);
router.get('/mechanics', mechanicController.getAllMechanics);
router.get('/mechanics/:id', mechanicController.getMechanicById);
router.put('/mechanics/:id', mechanicController.updateMechanic);
router.delete('/mechanics/:id', mechanicController.deleteMechanic);
router.get("/fetchUser",getAllUsers);

// Route for sending OTP to reset password
router.post("/resetotp", sendResetPasswordOTP)

// Route for verifying OTP and resetting password
router.post("/passwordreset", verifyOTPAndResetPassword)

// Route to verify OTP and create user
router.post("/sendotp", verifyOtpAndCreateUser);


// Route for calling
router.post("/call/create-room", createRoom);
router.post("/call/start", startCall);
router.post("/call/end", endCall);

// Send a message
router.post("/chat/send-message", sendMessage);

// Get all messages in a room
router.get("/chat/:roomId/messages", getMessages);

{/* Location Routes */}
router.post("/update-location", updateLocation); 

router.get("/nearby-mechanics", getNearbyMechanics); 

{/* Booking routes */ }
router.post("/confirm-booking", confirmBooking);
const { getWorkersByOwner,getFreeWorkers } = require("../controllers/workerController");

router.get("/owner/:ownerId/workers", getWorkersByOwner);
router.get("/free-workers/:ownerId", getFreeWorkers);

const {
    assignRequestToSpecificWorker,
    getAssignedTasks
  } = require("../controllers/assignRequestToSpecificWorker"); // Adjust the path if needed
  
  // Route to assign a request to a specific worker (if they are free)
  router.put('/assign-request/:requestId/:workerId', assignRequestToSpecificWorker);
  
  // Route to get all tasks assigned to a specific worker
  router.get('/assigned-tasks/:workerId', getAssignedTasks);
module.exports = router;

