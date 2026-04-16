const { errorResponse } = require("../utils/responseFormatter");

const notFound = (req, res) => {
  res.status(404).json(errorResponse("Route not found"));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const safeMessage = statusCode === 500 ? "Something went wrong" : err.message;
  res.status(statusCode).json(errorResponse(safeMessage));
};

module.exports = {
  notFound,
  errorHandler,
};
