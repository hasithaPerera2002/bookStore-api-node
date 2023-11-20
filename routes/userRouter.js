const express = require("express");
const router = express.Router();

const passport = require("passport");
require("../middleware/passportSetup");
const {
  register,
  login,
  forgotPassword,
} = require("../controller/userController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);

router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "auth/success",
    failureRedirect: "/auth/failure",
  })
);

router.route("/auth/failure").get((req, res) => {
  console.log("Failed attempt");
  res.send("Failed attempt");
});

router.route("/auth/success").get((req, res) => {
  console.log("Success");
  res.send("Success");
});

module.exports = router;
