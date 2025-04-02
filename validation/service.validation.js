const Joi = require("joi");

const validateService = function (service, verb) {
  const allFieldsRequired = verb === "patch" ? false : true;
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(allFieldsRequired),
    lengthInMin: Joi.number().positive().required(allFieldsRequired),
    price: Joi.number().positive().max(300).required(allFieldsRequired),
    inPerson: Joi.boolean().required(allFieldsRequired),
  });

  return schema.validate(service);
};

module.exports = validateService;
