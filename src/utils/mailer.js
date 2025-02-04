require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

const sendEmail = async (to, subject, content, isHtml = false) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    [isHtml ? "html" : "text"]: content, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
  }
};

module.exports = sendEmail;
