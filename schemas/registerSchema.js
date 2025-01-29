const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': '"Name" should be a type of text',
      'string.empty': '"Name" cannot be an empty field',
      'string.min': '"Name" should have a minimum length of 3',
      'string.max': '"Name" should have a maximum length of 50',
      'any.required': '"Name" is a required field',
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': '"Email" should be a type of text',
      'string.empty': '"Email" cannot be an empty field',
      'string.email': '"Email" should be a valid email address',
      'any.required': '"Email" is a required field',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': '"Password" should be a type of text',
      'string.empty': '"Password" cannot be an empty field',
      'string.min': '"Password" should have a minimum length of 6',
      'any.required': '"Password" is a required field',
    }),

  role: Joi.string()
    .valid("admin", "user")
    .default("user")
    .messages({
      'string.base': '"Role" should be a type of text',
      'string.empty': '"Role" cannot be an empty field',
      'any.only': '"Role" should be either "admin" or "user"',
    }),
});

module.exports = registerSchema;
