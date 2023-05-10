const Joi = require("joi");

exports.validateUpdateBranche = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().max(255).messages({
      "any.required": "O campo nome da loja é obrigatório",
      "string.max": "O campo nome da loja deve ter no máximo 255 caracteres",
    }),
    address: Joi.string().max(255).messages({
      "string.max": "O campo endereço deve ter no máximo 255 caracteres",
    }),
    phone: Joi.string().max(50).messages({
      "string.max": "O campo telefone deve no máximo 50 caracteres",
    }),
    whatsapp: Joi.string().max(50).messages({
      "string.max": "O campo WhatsApp deve ter no máximo 50 caracteres",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.reduce((acc, detail) => {
      const { message, context } = detail;
      const { label } = context;
      return {
        ...acc,
        [label]: message,
      };
    }, {});

    return res.status(400).json({
      errors: errorMessages,
    });
  }

  return next();
};
