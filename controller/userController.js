const User = require("../model/userSchema");
const asyncErrorHandler = require("../util/asyncErrorHandler");
const CustomError = require("../util/customError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = asyncErrorHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      throw new CustomError("Something went wrong", 500);
    }

    let user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hash,
    });
    user.save().then((user) => {
      res.status(201).json({ user });
    });
  });
});

const login = asyncErrorHandler(async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: [{ username: username }, { email: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
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
            res.setHeader("Authorization", `Bearer ${token}`);
            res.status(200).json({ message: "check the header" });
          } else {
            throw new CustomError("Password does not matched!", 401);
          }
        });
      } else {
        throw new CustomError("No user found!", 404);
      }
    }
  );
});

const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new CustomError("user not found", 404);
  }

  res.status(200).json({ resetToken });
});

module.exports = { register, login, forgotPassword };
