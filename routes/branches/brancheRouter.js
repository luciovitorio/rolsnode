const express = require("express");
const {
  storeBrancheController,
  indexBrancheController,
  showBrancheController,
  updateBrancheController,
  destroyBrancheController,
} = require("../../controller/brancheController");

const brancheRouter = express.Router();

// Store
brancheRouter.post("/", storeBrancheController);

// Index
brancheRouter.get("/", indexBrancheController);

// Show
brancheRouter.get("/:id", showBrancheController);

// Update
brancheRouter.put("/:id", updateBrancheController);

// Destroy
brancheRouter.delete("/:id", destroyBrancheController);

module.exports = brancheRouter;
