const Admin = require("../model/adminSchema");
const asyncErrorHandler = require("../util/asyncErrorHandler");
const CustomError = require("../util/customError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = asyncErrorHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      throw new CustomError("Something went wrong", 500);
    }
  });

  let admin = new Admin({
    email: req.body.email,
    username: req.body.username,
    password: hash,
  });
  admin.save().then((admin) => {
    res.status(201).json({ admin });
  });
});

const login = asyncErrorHandler(async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  Admin.findOne({ $or: [{ username: username }, { email: username }] }).then(
    (admin) => {
      if (admin) {
        bcrypt.compare(password, admin.password, function (err, result) {
          if (err) {
            throw new CustomError(
              "Something went wrong /" + err.message + "",
              500
            );
          }
          if (result) {
            let token = jwt.sign(
              { username: username },
              process.env.SECRET_KEY,
              {
                expiresIn: "1h",
              }
            );
            resp.setHeader("Authorization", `Bearer ${token}`);
            resp.status(200).json({ message: "check the header" });
          } else {
            throw new CustomError("Password does not matched!", 401);
          }
        });
      } else {
        throw new CustomError("No admin found!", 404);
      }
    }
  );
});

module.exports = { register };
