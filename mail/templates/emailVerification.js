const emailVerification = (otp) => {
    return `
      <html>
        <body>
          <h2>Verification Code</h2>
          <p>Your OTP for email verification is: <strong>${otp}</strong></p>
          <p>This OTP is valid for 5 minutes.</p>
        </body>
      </html>
    `;
  };
  
  module.exports = emailVerification;
  
