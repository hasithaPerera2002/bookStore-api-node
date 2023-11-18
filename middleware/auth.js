const jsonwebtoken = require("jsonwebtoken");
const CustomError = require("../util/customError");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    if (authHeader.startsWith("Bearer ")) {
      var token = authHeader.substring(7, authHeader.length);
      if (token) {
        const verify = jsonwebtoken.verify(token, process.env.SECRET_KEY);
        next();
      } else {
        throw new CustomError("Invalid token", 401);
      }
    } else {
      throw new CustomError("No valid bearer token provided", 401);
    }
  } else {
    throw new CustomError("No token provided", 401);
  }
}

module.exports = verifyToken;
