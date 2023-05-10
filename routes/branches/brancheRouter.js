const express = require("express");
const {
  storeBrancheController,
  indexBrancheController,
  showBrancheController,
  updateBrancheController,
  destroyBrancheController,
} = require("../../controller/brancheController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {
  validateCreateBranche,
} = require("../../middlewares/validateCreateBranche");
const {
  validateUpdateBranche,
} = require("../../middlewares/validateUpdateBranche");

const brancheRouter = express.Router();

// Store
brancheRouter.post(
  "/",
  isLogin,
  isAdmin,
  validateCreateBranche,
  storeBrancheController
);

// Index
brancheRouter.get("/", isLogin, isAdmin, indexBrancheController);

// Show
brancheRouter.get("/:id", isLogin, isAdmin, showBrancheController);

// Update
brancheRouter.put(
  "/:id",
  isLogin,
  isAdmin,
  validateUpdateBranche,
  updateBrancheController
);

// Destroy
brancheRouter.delete("/:id", isLogin, isAdmin, destroyBrancheController);

module.exports = brancheRouter;
