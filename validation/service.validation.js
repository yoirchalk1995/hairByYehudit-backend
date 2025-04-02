const Joi = require("joi");

const validateService = function (service) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    lengthInMinutes: Joi.number().positive().required(),
    price: Joi.number().positive().max(300).required(),
    inPerson: Joi.boolean().required(),
  });

  return schema.validate(service);
};

module.exports = validateService;
