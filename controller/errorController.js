const CustomError = require("../util/customError");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  if (error.name === "CastError")
    error = new CustomError(
      `Invalid value for ${error.path} : ${error.value} `,
      400
    );
  if (error.code === 11000)
    error = new CustomError(
      `Duplicate field value for ${error.keyValue.name}`,
      400
    );
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((val) => val.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    error = new CustomError(message, 400);
  }
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});
