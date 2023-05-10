const express = require("express");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const sequelizeConfig = require("../config/config");
const userRouter = require("../routes/users/userRouter");
const authRouter = require("../routes/auth/authRouter");
const brancheRouter = require("../routes/branches/brancheRouter");
const {
  globalErrorHandler,
  notFoundError,
} = require("../middlewares/globalErrorHandler");

const app = express();
const sequelize = new Sequelize(sequelizeConfig.development);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database successfully completed");
  } catch (error) {
    console.error("Could not connect to the database");
  }
})();

// Middlewares
app.use(morgan("dev"));
app.use(express.json()); //pass incoming json data

// Routes
/** Auth routes */
app.use("/api/v1", authRouter);

/** User routes */
app.use("/api/v1/users", userRouter);

/** Branche routes */
app.use("/api/v1/branches", brancheRouter);

//Error middlewares
app.use(notFoundError);
app.use(globalErrorHandler);

module.exports = app;
