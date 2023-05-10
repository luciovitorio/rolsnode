const AsyncHandler = require("express-async-handler");
const { Branche } = require("../models");
const { Op } = require("sequelize");

/**
 * @desc Store branches
 * @route POST /api/v1/branches
 * @access Private
 */
exports.storeBrancheController = AsyncHandler(async (req, res) => {
  const { name, address, phone, whatsapp } = req.body;

  // Check if username exists
  const isNameExists = await Branche.findOne({ where: { name } });

  if (isNameExists) {
    const error = new Error("Já existe uma loja cadastrada com esse nome");
    error.statusCode = 409;
    throw error;
  }

  const branche = await Branche.create({
    name,
    address,
    phone,
    whatsapp,
  });

  res.status(201).json({
    status: "success",
    message: "Usuário criado com sucesso",
    data: branche,
  });
});

/**
 * @desc Index branches
 * @route GET /api/v1/branches
 * @access Private
 */
exports.indexBrancheController = AsyncHandler(async (req, res) => {
  const branches = await Branche.findAll();

  return res.json({
    data: branches,
  });
});

/**
 * @desc Show branches
 * @route GET /api/v1/branches/:id
 * @access Private
 */
exports.showBrancheController = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const branche = await Branche.findByPk(id);

  // Verificando se o id é um id válido
  if (!branche) {
    const error = new Error("Loja não encontrada");
    error.statusCode = 404;
    throw error;
  }

  return res.json({
    data: branche,
  });
});

/**
 * @desc Update branches
 * @route GET /api/v1/branches/:id
 * @access Private
 */
exports.updateBrancheController = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, whatsapp } = req.body;

  const verifyIfBrancheExists = await Branche.findByPk(id);
  const brancheData = verifyIfBrancheExists;

  // Verificando se o id é um id válido
  if (!verifyIfBrancheExists) {
    const error = new Error("Loja não encontrada");
    error.statusCode = 404;
    throw error;
  }

  // Verificando se o nome loja já existe.
  const verifyIfNameExist = await Branche.findOne({
    where: {
      name,
      id: {
        [Op.ne]: brancheData.dataValues.id,
      },
    },
  });

  if (verifyIfNameExist) {
    const error = new Error("Já existe uma loja cadastrada com esse nome");
    error.statusCode = 409;
    throw error;
  }

  await Branche.update(
    {
      name,
      address,
      phone,
      whatsapp,
    },
    {
      where: { id },
      returning: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Loja alterada com sucesso",
  });
});

/**
 * @desc Destroy branches
 * @route GET /api/v1/branches/:id
 * @access Private
 */
exports.destroyBrancheController = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const branche = await Branche.findByPk(id);

  // Verificando se o id é um id válido
  if (!branche) {
    const error = new Error("Loja não encontrada");
    error.statusCode = 404;
    throw error;
  }

  await branche.destroy();

  res.status(200).json({
    status: "success",
    message: "Registro excluído com sucesso",
  });
});
