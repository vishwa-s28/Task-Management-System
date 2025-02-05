import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middlewares/validation.js";
import { AUTH_ENDPOINTS } from "../constants/endpoints.js";

const router = express.Router();

router.post(AUTH_ENDPOINTS.REGISTER, validateRegister, registerUser);
router.post(AUTH_ENDPOINTS.LOGIN, validateLogin, loginUser);

export default router;
