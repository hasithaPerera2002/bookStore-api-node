const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your username!"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    minlength: [6, "Password must be at least 6 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please enter a valid email address!",
    },
  },
});

module.exports = mongoose.model("Admin", adminSchema);
