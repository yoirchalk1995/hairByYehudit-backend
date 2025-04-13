const Joi = require("joi");

function validateAvailability(body) {
  const schema = Joi.object({
    date: Joi.date().required(),
    startTime: Joi.string()
      .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
      .message(
        "startTime must be in format hh:mm with 0 placeholder when necessary"
      ),
    endTime: Joi.string()
      .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
      .message(
        "endTime must be in format hh:mm with 0 placeholder when necessary"
      ),
    isAvailable: Joi.boolean().required(),
  });

  return schema.validate(body);
}

module.exports = validateAvailability;
