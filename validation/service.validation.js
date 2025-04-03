const Joi = require("joi");

const validateService = function (service, verb) {
  const allFieldsRequired = verb === "patch" ? false : true;
  const baseSchema = {
    name: Joi.string().min(5).max(20),
    lengthInMin: Joi.number().positive(),
    price: Joi.number().positive().max(300),
    inPerson: Joi.boolean(),
  };

  const schema = Joi.object(
    Object.fromEntries(
      Object.entries(baseSchema).map(([key, rule]) => [
        key,
        allFieldsRequired ? rule.required() : rule,
      ])
    )
  );

  return schema.validate(service);
};

module.exports = validateService;
