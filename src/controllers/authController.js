import bcrypt from "bcrypt";
import db from "../sequelize-client.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import { AUTH_ERRORS } from "../constants/errorMessages.js";
import "dotenv/config";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      throw new AppError(AUTH_ERRORS.MISSING_FIELDS, 400);
    }

    const apiKey = process.env.API_KEY;
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

    const response = await axios.get(url);
    if (
      !response.data.is_valid_format.value ||
      response.data.deliverability !== "DELIVERABLE"
    ) {
      throw new AppError(AUTH_ERRORS.INVALID_EMAIL, 400);
    }

    const { User } = db;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError(AUTH_ERRORS.EMAIL_EXISTS, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      ...(role && { role }),
    });

    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      next(new AppError(error.message, 400));
    } else {
      next(error);
    }
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(AUTH_ERRORS.MISSING_FIELDS, 400);
    }

    const { User } = db;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError(AUTH_ERRORS.INVALID_CREDENTIALS, 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(AUTH_ERRORS.INVALID_CREDENTIALS, 400);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    user.token = token;
    await user.save();

    res.status(200).json({ token });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      next(new AppError(error.message, 400));
    } else {
      next(error);
    }
  }
};

export { registerUser, loginUser };
