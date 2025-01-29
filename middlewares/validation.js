const registerSchema = require("../schemas/registerSchema");
const loginSchema = require("../schemas/loginSchema");

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    const errorDetails = error.details.map((err) => err.message);
    return res
      .status(400)
      .json({ message: "Validation error", errors: errorDetails });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const errorDetails = error.details.map((err) => err.message);
    return res
      .status(400)
      .json({ message: "Validation error", errors: errorDetails });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
