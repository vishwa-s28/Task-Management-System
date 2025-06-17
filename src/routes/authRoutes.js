import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middlewares/validation.js";
import { AUTH_ENDPOINTS } from "../constants/endpoints.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post(AUTH_ENDPOINTS.REGISTER, validateRegister, registerUser);
router.post(AUTH_ENDPOINTS.LOGIN, validateLogin, loginUser);
router.post(AUTH_ENDPOINTS.LOGOUT, authenticate, logoutUser);

export default router;
