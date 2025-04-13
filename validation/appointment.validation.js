const Joi = require("joi");

function validateAppointment(appointment) {
  const schema = Joi.object({
    userId: Joi.number().required().max(999999999),
    serviceId: Joi.number().required().max(999),
    date: Joi.date().required(),
    startTime: Joi.string()
      .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
      .message(
        "startTime must be in format hh:mm with 0 placeholder when necessary"
      ),
  });

  return schema.validate(appointment);
}

module.exports = validateAppointment;
