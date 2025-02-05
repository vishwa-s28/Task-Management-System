import { GENERAL_MESSAGES } from "../constants/errorMessages.js";

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || GENERAL_MESSAGES.SERVER_ERROR;
  //   console.error(err);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export default globalErrorHandler;
