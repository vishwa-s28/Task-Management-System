const bcrypt = require("bcrypt");
const db = require("../sequelize-client");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { default: AppError } = require("../utils/appError");
require("dotenv").config();

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const apiKey = process.env.API_KEY;
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;
    const response = await axios.get(url);
    if (
      !response.data.is_valid_format.value ||
      response.data.deliverability !== "DELIVERABLE"
    ) {
      throw new AppError("Invalid or undeliverable email address.", 400);
    }

    const { User } = db;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      throw new AppError(
        "E-Mail exists already, please pick a different one.",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      ...(req.body.role && { role: req.body.role })
    });
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { User } = db;
    const user = await User.findOne({ where: { email } });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      throw new AppError("Invalid email or password", 400);
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
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
