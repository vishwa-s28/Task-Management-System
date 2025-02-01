const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
//   console.error(err);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = globalErrorHandler;
