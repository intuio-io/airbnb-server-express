const Joi = require("joi");

// Validation schema for registration
const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6) // Minimum length of 6 characters
    .required(),
});

// Validation schema for sign-in
const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, signInSchema };
