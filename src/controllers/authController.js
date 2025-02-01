const bcrypt = require("bcrypt");
const db = require("../sequelize-client");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const apiKey = process.env.API_KEY;
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;
    const response = await axios.get(url);
    if (
      !response.data.is_valid_format.value ||
      response.data.deliverability !== "DELIVERABLE"
    ) {
      return res
        .status(500)
        .json({ message: "Invalid or undeliverable email address." });
    }

    const { User } = db;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(500).json({
        message: "E-Mail exists already, please pick a different one.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { User } = db;
    const user = await User.findOne({ where: { email } });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    user.token = token;
    await user.save();
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
