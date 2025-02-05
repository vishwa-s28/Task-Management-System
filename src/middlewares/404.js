import AppError from "../utils/appError.js";
import { GENERAL_MESSAGES } from "../constants/errorMessages.js";

const notFound = (req, res, next) => {
  next(new AppError(`${GENERAL_MESSAGES.NOT_FOUND}: ${req.originalUrl}`, 404));
};

export default notFound;
