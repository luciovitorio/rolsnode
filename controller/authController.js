const AsyncHandler = require("express-async-handler");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const verifyToken = require("../utils/verifyToken");

/**
 * @desc Login
 * @route POST /api/v1/login
 * @access Private
 */
exports.loginAuthController = AsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.json({
      message: "Usuário não encontrado",
    });
  }

  // verify if password match
  const verifyPassword = await bcrypt.compare(password, user.password);

  console.log(verifyPassword);

  if (!verifyPassword) {
    return res.json({
      message: "Usuário e/ou senha inválido",
    });
  }

  const token = generateToken(user.id);

  if (token) {
    const verify = verifyToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNzcwY2I1LWMzMmUtNGNhZS1hY2MwLWVjOWE5MjBmNzE1YSIsImlhdCI6MTY4MzY3NzAwNSwiZXhwIjoxNjg0MTA5MDA1fQ.J4BKcfxprFsEtOlNY7LApayrDK_3inl9lwLZxgABkD0"
    );
    console.log(verify);
  }

  data = {
    id: user.id,
    username: user.username,
    is_active: user.is_active,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token: generateToken(user.id),
  };

  req.userAuth = data;

  return res.json({
    data: data,
  });
});

/**
 * @desc Logout
 * @route POST /api/v1/login
 * @access Private
 */
exports.logoutAuthController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "User Logout",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
