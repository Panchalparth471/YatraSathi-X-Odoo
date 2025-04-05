const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create the transporter using SMTP settings
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // e.g. smtp.gmail.com
      port: 587, // Port 587 for TLS
      secure: false, // Use TLS, not SSL (Port 465 for SSL)
      auth: {
        user: process.env.MAIL_USER, // Your email (e.g., your-email@gmail.com)
        pass: process.env.MAIL_PASS, // Your password or app-specific password
      },
    });

    // Set up email details
    let info = await transporter.sendMail({
      from: `"YatraSathi | OTP Auth" <${process.env.MAIL_USER}>`, // Sender address
      to: `${email}`, // Recipient email
      subject: `${title}`, // Subject line
      html: `${body}`, // HTML body content
    });

    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error while sending email:", error.message);
    return error.message;
  }
};

module.exports = mailSender;
