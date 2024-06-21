const Joi = require("joi");

// Validation schema for creating a reservation
const reservationSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required().greater(Joi.ref("startDate")),
  totalPrice: Joi.number().integer().min(1).required(),
  listingId: Joi.string().length(24).hex().required(),
});

module.exports = { reservationSchema };
