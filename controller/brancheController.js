/**
 * @desc Store branches
 * @route POST /api/v1/branches
 * @access Private
 */
exports.storeBrancheController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Branche created",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

/**
 * @desc Index branches
 * @route GET /api/v1/branches
 * @access Private
 */
exports.indexBrancheController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Branche listed",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

/**
 * @desc Show branches
 * @route GET /api/v1/branches/:id
 * @access Private
 */
exports.showBrancheController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Branche showed",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

/**
 * @desc Update branches
 * @route GET /api/v1/branches/:id
 * @access Private
 */
exports.updateBrancheController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Branche updated",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

/**
 * @desc Destroy branches
 * @route GET /api/v1/branches/:id
 * @access Private
 */
exports.destroyBrancheController = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Branche deleted",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
