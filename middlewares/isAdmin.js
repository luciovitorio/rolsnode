const AsyncHandler = require("express-async-handler");
const { User } = require("../models");

const isAdmin = AsyncHandler(async (req, res, next) => {
  const user = req.userAuth;

  if (user.dataValues.role !== "ADMIN") {
    const error = new Error("Usuário sem permissão de acesso");
    error.statusCode = 401;
    throw error;
  }
  next();
});

module.exports = isAdmin;
