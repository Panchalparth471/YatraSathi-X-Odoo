const bcrypt = require("bcrypt")
const User = require("../models/User")
const OTP = require("../models/OTP")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const mailSender = require("../utils/mailSender")
const emailVerification = require("../mail/templates/emailVerification"); 
//const Profile = require("../models/Profile")
require("dotenv").config()

// Signup Controller for Registering Users
exports.signup = async (req, res) => {
	try {
	  const { firstName, lastName, email, password, accountType } = req.body;
  
	  // Check if all required fields are present
	  if (!firstName || !lastName || !email || !password || !accountType) {
		return res.status(400).json({
		  success: false,
		  message: "All fields are required",
		});
	  }
  
	  // Check if user already exists
	  const existingUser = await User.findOne({ email });
	  if (existingUser) {
		return res.status(400).json({
		  success: false,
		  message: "User already exists. Please login.",
		});
	  }
  
	  // Generate OTP
	  const otp = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		lowerCaseAlphabets: false,
		specialChars: false,
	  });
  
	  // Save OTP in the database
	  await OTP.create({ email, otp });
  
	  // Generate email content using emailVerification.js
	  const emailBody = emailVerification(otp);
  
	  // Send OTP via email using mailSender
	  await mailSender(email, "OTP Verification", emailBody);
  
	  res.status(200).json({
		success: true,
		message: "OTP sent successfully. Please verify to complete registration.",
		tempUser: {
		  firstName,
		  lastName,
		  email,
		  password,
		  accountType,
		},
	  });
	} catch (error) {
	  res.status(500).json({
		success: false,
		message: "Error while signing up.",
		error: error.message,
	  });
	}
  };
// Verify OTP and Create User
  exports.verifyOtpAndCreateUser = async (req, res) => {
	try {
	  const { email, otp, tempUser } = req.body;
  
	  // Check if OTP is valid
	  const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
  
	  if (response.length === 0 || otp !== response[0].otp) {
		return res.status(400).json({
		  success: false,
		  message: "Invalid OTP or OTP expired. Please try again.",
		});
	  }
  
	  // Hash the password
	  const hashedPassword = await bcrypt.hash(tempUser.password, 10);
  
	  // Create the user after OTP verification
	  const user = await User.create({
		firstName: tempUser.firstName,
		lastName: tempUser.lastName,
		email: tempUser.email,
		password: hashedPassword,
		accountType: tempUser.accountType,
	  });
  
	  // Remove OTP from DB after successful verification
	  await OTP.deleteMany({ email });
  
	  res.status(201).json({
		success: true,
		message: "User registered successfully!",
		user,
	  });
	} catch (error) {
	  res.status(500).json({
		success: false,
		message: "Error during OTP verification and user creation.",
		error: error.message,
	  });
	}
  };

// Login Controller for Authenticating Users
exports.login = async (req, res) => {
	try {
	  // Get email and password from request body
	  const { email, password } = req.body
  
	  // Check if email or password is missing
	  if (!email || !password) {
		return res.status(400).json({
		  success: false,
		  message: `Please Fill up All the Required Fields`,
		})
	  }
  
	  // Find user with provided email
	  const user = await User.findOne({ email })
  
	  // If user not found with provided email
	  if (!user) {
		return res.status(401).json({
		  success: false,
		  message: `User is not Registered with Us. Please SignUp to Continue`,
		})
	  }
  
	  // Compare password with hashed password
	  const isPasswordValid = await bcrypt.compare(password, user.password)
  
	  if (isPasswordValid) {
		// Generate JWT Token
		const token = jwt.sign(
		  { email: user.email, id: user._id, role: user.accountType },
		  process.env.JWT_SECRET,
		  {
			expiresIn: "24h",
		  }
		)
  
		// Save token and return response
		user.token = token
		user.password = undefined
  
		// Set cookie and send response
		res.cookie("token", token, {
		  httpOnly: true,
		  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
		})
  
		return res.status(200).json({
		  success: true,
		  token,
		  user,
		  message: "User Login Success",
		})
	  } else {
		return res.status(401).json({
		  success: false,
		  message: "Incorrect Password. Please try again.",
		})
	  }
	} catch (error) {
	  console.error("Error during login:", error.message)
	  return res.status(500).json({
		success: false,
		message: "Login Failure. Please Try Again.",
	  })
	}
  }


// Send OTP for Resetting Password
exports.sendResetPasswordOTP = async (req, res) => {
	try {
	  const { email } = req.body
  
	  // Check if user exists
	  const user = await User.findOne({ email })
	  if (!user) {
		return res.status(404).json({
		  success: false,
		  message: "User not found. Please enter a valid email.",
		})
	  }
  
	  // Generate OTP
	  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  
	  // Save OTP in DB
	  await OTP.create({
		email,
		otp,
		createdAt: Date.now(),
		expiresAt: Date.now() + 5 * 60 * 1000, // OTP valid for 5 mins
	  })
  
	  // Send OTP via Email
	  const emailBody = emailVerification(otp)
	  await mailSender(
		email,
		"Password Reset OTP - YatraSathi",
		emailBody
	  )
  
	  return res.status(200).json({
		success: true,
		message: "OTP sent successfully. Check your email.",
	  })
	} catch (error) {
	  console.error("Error while sending OTP:", error)
	  return res.status(500).json({
		success: false,
		message: "Error while sending OTP. Please try again later.",
	  })
	}
  }

  // Verify OTP and Reset Password
exports.verifyOTPAndResetPassword = async (req, res) => {
	try {
	  const { email, otp, newPassword } = req.body
  
	  // Check if OTP exists
	  const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1)
	  if (!otpRecord || otpRecord.otp !== otp) {
		return res.status(400).json({
		  success: false,
		  message: "Invalid or expired OTP.",
		})
	  }
  
	  // Check if OTP has expired
	  if (otpRecord.expiresAt < Date.now()) {
		return res.status(400).json({
		  success: false,
		  message: "OTP has expired. Please request a new one.",
		})
	  }
  
	  // Hash the new password
	  const hashedPassword = await bcrypt.hash(newPassword, 10)
  
	  // Update user's password in DB
	  await User.findOneAndUpdate(
		{ email },
		{ password: hashedPassword },
		{ new: true }
	  )
  
	  // Delete OTP after successful verification
	  await OTP.deleteOne({ _id: otpRecord._id })
  
	  return res.status(200).json({
		success: true,
		message: "Password has been reset successfully.",
	  })
	} catch (error) {
	  console.error("Error during OTP verification:", error)
	  return res.status(500).json({
		success: false,
		message: "Error while verifying OTP. Please try again later.",
	  })
	}
  }
