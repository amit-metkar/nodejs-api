const errorResponse = require("./errorResponse");

function apiNotFound(req, res, next) {
  return res.status(404).json(errorResponse(req, "api not found"));
}

module.exports = apiNotFound;
