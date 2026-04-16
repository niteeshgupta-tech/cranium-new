const successResponse = (message, data = {}) => ({
  success: true,
  message,
  data,
});

const errorResponse = (message = "Something went wrong") => ({
  success: false,
  message,
});

const successWithCompatibility = (message, data = {}) => ({
  success: true,
  message,
  ...data,
});

module.exports = {
  successResponse,
  errorResponse,
  successWithCompatibility,
};
