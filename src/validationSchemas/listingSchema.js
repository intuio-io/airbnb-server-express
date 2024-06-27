const Joi = require("joi");

// Nested schema for validating location details
const locationSchema = Joi.object({
  label: Joi.string().min(1).max(255).required(),
  latlng: Joi.array().items(Joi.number()).length(2).required(),
  region: Joi.string().min(1).max(255).required(),
  value: Joi.string().min(1).max(255).required(),
});

// Validation schema for creating a listing
const listingSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).max(2048).required(), // Assuming a maximum of 2048 characters for descriptions
  imageSrc: Joi.string().uri().required(), // Validate that the input is a URI
  category: Joi.string().min(1).max(255).required(),
  roomCount: Joi.number().integer().min(1).required(),
  bathroomCount: Joi.number().integer().min(1).required(),
  guestCount: Joi.number().integer().min(1).required(),
  location: locationSchema.required(),
  userId: Joi.required(),
  price: Joi.number().integer().min(1).required(),
});

module.exports = { listingSchema };
