const express = require("express");
const router = express.Router();
const multer = require("multer");


const mechanicController = require('../controllers/mechanicController');
const { updateLocation, getNearbyMechanics } = require("../controllers/location");


const upload = multer({ storage });
const {
    signup,
    verifyOtpAndCreateUser,
    login,
    sendResetPasswordOTP,
    verifyOTPAndResetPassword,
  } = require("../controllers/Auth");
  
  

// Send service request
router.post('/request', sendRequest);


router.get('/requests/:mechanicId', getRequestLists);

// Accept a request
router.put('/accept-request/:requestId', acceptRequest);

// Reject/delete a request
router.delete('/reject-request/:requestId', rejectRequest);


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


{/* Location Routes */}
router.post("/update-location", updateLocation); 

router.get("/nearby-mechanics", getNearbyMechanics); 

