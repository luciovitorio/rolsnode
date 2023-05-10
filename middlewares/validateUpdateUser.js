const Joi = require("joi");

exports.validateUpdateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().max(255).messages({
      "string.max": "O campo nome de usuario deve ter no máximo 255 caracteres",
    }),
    password: Joi.string().min(3).messages({
      "string.min": "O campo senha deve ter no mínimo 3 caracteres",
    }),
    password_confirmation: Joi.string().valid(Joi.ref("password")).messages({
      "string.min":
        "O campo confirmação de senha deve ter no mínimo 3 caracteres",
      "any.only": "As senhas não conferem",
    }),
    is_active: Joi.boolean().truthy(1).falsy(0).required().messages({
      "any.required": "O campo ativo é obrigatório",
      "boolean.base": "O campo ativo deve ser sim ou não",
    }),
    name: Joi.string().max(255).messages({
      "string.max": "O campo nome deve ter no máximo 255 caracteres",
    }),
    email: Joi.string().email().messages({
      "string.email": "O campo email deve ser um email válido",
    }),
    phone: Joi.string().max(50).messages({
      "string.max": "O campo telefone deve ter no máximo 50 caracteres",
    }),
    role: Joi.string().valid("ADMIN", "PASSADEIRA", "ENTREGADOR").messages({
      "any.only":
        "O campo perfil deve ser administrador, passadeira ou entregador",
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
