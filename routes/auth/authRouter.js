const express = require("express");
const {
  loginAuthController,
  logoutAuthController,
} = require("../../controller/authController");

const authRouter = express.Router();

authRouter.post("/login", loginAuthController);

authRouter.post("/logout", logoutAuthController);

module.exports = authRouter;
