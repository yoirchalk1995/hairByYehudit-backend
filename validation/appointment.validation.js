const Joi = require("joi");

function validateAppointment(appointment) {
  const schema = Joi.object({
    userId: Joi.number().required().max(999999999),
    serviceId: Joi.number().required().max(999),
    date: Joi.date().required(),
    startTime: Joi.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  });

  return schema.validate(appointment);
}

module.exports = validateAppointment;
