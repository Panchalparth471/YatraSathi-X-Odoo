const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

// Generate Password Reset Token and Send Email
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not registered. Please enter a valid email.`,
      })
    }

    // Generate Reset Token (32 Characters)
    const token = crypto.randomBytes(16).toString("hex")

    // Update user with token and expiration time (1 Hour Validity)
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    )
    console.log("Updated Details", updatedDetails)

    // Create Reset URL (From Env Variable)
    const url = `${process.env.FRONTEND_URL}/update-password/${token}`

    // Send Email with Reset Link
    await mailSender(
      email,
      "Password Reset",
      `Your link to reset your password is: ${url}. Click on the link to continue.`
    )

    res.json({
      success: true,
      message:
        "Email Sent Successfully. Please check your email to reset your password.",
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Error occurred while sending the reset message.`,
    })
  }
}

// Reset Password Using Token
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body

    // Check if passwords match
    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password do not match",
      })
    }

    // Find user with the given token
    const userDetails = await User.findOne({ token: token })
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Invalid token. Please regenerate your reset link.",
      })
    }

    // Check if token is expired
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is expired. Please regenerate your reset token.`,
      })
    }

    // Hash and update password
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { token: token },
      {
        password: encryptedPassword,
        token: "", // Clear token after reset
        resetPasswordExpires: undefined,
      },
      { new: true }
    )

    res.json({
      success: true,
      message: `Password reset successful. You can now log in with your new password.`,
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Error occurred while updating the password.`,
    })
  }
}