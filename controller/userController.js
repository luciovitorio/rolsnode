const { User } = require("../models");
const bcrypt = require("bcrypt");
const AsyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

/**
 * @desc Store user
 * @route POST /api/v1/users
 * @access Private
 */
exports.storeUserController = AsyncHandler(async (req, res) => {
  const {
    username,
    password,
    password_confirmation,
    is_active,
    name,
    email,
    phone,
    role,
  } = req.body;

  // Check if username exists
  const isUsernameExists = await User.findOne({ where: { username } });
  if (isUsernameExists) {
    const error = new Error("Nome de usuário já cadastrado com esse nome");
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    password_confirmation,
    is_active,
    name,
    email,
    phone,
    role,
  });

  const selectedUser = await User.findByPk(user.id, {
    attributes: ["id", "username", "is_active", "email", "phone", "role"],
  });

  res.status(201).json({
    status: "success",
    message: "Usuário criado com sucesso",
    data: selectedUser,
  });
});

/**
 * @desc Index users
 * @route GET /api/v1/users
 * @access Private
 */
exports.indexUserController = AsyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: [
      "id",
      "username",
      "is_active",
      "name",
      "email",
      "phone",
      "role",
    ],
  });

  return res.json({
    data: users,
  });
});

/**
 * @desc Show user
 * @route GET /api/v1/users/:id
 * @access Private
 */
exports.showUserController = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    attributes: [
      "id",
      "username",
      "is_active",
      "name",
      "email",
      "phone",
      "role",
    ],
  });

  // Verificando se o id é um id válido
  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return res.json({
    data: user,
  });
});

/**
 * @desc Update user
 * @route GET /api/v1/users/:id
 * @access Private
 */
exports.updateUserController = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    password_confirmation,
    is_active,
    name,
    email,
    phone,
    role,
  } = req.body;

  const verifyIfUserExists = await User.findByPk(id);
  const userData = verifyIfUserExists;

  // Verificando se o id é um id válido
  if (!verifyIfUserExists) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  // Verificando se o usuário enviou a senha para alterar
  if (password && password !== password_confirmation) {
    const error = new Error("As senhas não conferem");
    error.statusCode = 400;
    throw error;
  }

  let hashedPassword;

  // Verificando se o usuario enviou a senha para atualizar e criptografando ela
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // Verificando se o nome de usuário já existe.
  const verifyIfUsernameExist = await User.findOne({
    where: {
      username,
      id: {
        [Op.ne]: userData.dataValues.id,
      },
    },
  });

  if (verifyIfUsernameExist) {
    const error = new Error("Já existe um usuário com esse nome");
    error.statusCode = 409;
    throw error;
  }

  await User.update(
    {
      username,
      password: hashedPassword,
      password_confirmation,
      is_active,
      name,
      email,
      phone,
      role,
    },
    {
      where: { id },
      returning: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Usuário alterado com sucesso",
  });
});

/**
 * @desc Destroy user
 * @route GET /api/v1/users/:id
 * @access Private
 */
exports.destroyUserController = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  // Verificando se o id é um id válido
  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  await user.destroy();

  res.status(200).json({
    status: "success",
    message: "Registro excluído com sucesso",
  });
});
