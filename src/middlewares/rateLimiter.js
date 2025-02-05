import rateLimit from "express-rate-limit";
import { GENERAL_MESSAGES } from "../constants/errorMessages.js";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: GENERAL_MESSAGES.RATE_LIMIT_ERROR,
  },
});

export default rateLimiter;
