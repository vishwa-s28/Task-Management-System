import Joi from "joi";
import { SCHEMA_VALIDATION } from "../constants/errorMessages.js";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": SCHEMA_VALIDATION.EMAIL.BASE,
    "string.empty": SCHEMA_VALIDATION.EMAIL.EMPTY,
    "string.email": SCHEMA_VALIDATION.EMAIL.INVALID,
    "any.required": SCHEMA_VALIDATION.EMAIL.REQUIRED,
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": SCHEMA_VALIDATION.PASSWORD.BASE,
    "string.empty": SCHEMA_VALIDATION.PASSWORD.EMPTY,
    "string.min": SCHEMA_VALIDATION.PASSWORD.MIN,
    "any.required": SCHEMA_VALIDATION.PASSWORD.REQUIRED,
  }),
});

export default loginSchema;
