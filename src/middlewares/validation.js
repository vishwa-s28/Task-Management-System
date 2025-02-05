import registerSchema from "../validations/registerSchema.js";
import loginSchema from "../validations/loginSchema.js";
import { GENERAL_MESSAGES } from "../constants/errorMessages.js";

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    const errorDetails = error.details.map((err) => err.message);
    return res
      .status(400)
      .json({ message: GENERAL_MESSAGES.VALIDATION, errors: errorDetails });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const errorDetails = error.details.map((err) => err.message);
    return res
      .status(400)
      .json({ message: GENERAL_MESSAGES.VALIDATION, errors: errorDetails });
  }

  next();
};

export { validateLogin, validateRegister };
