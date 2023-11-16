const mongoose = require("mongoose");
const { type } = require("os");
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 100 },
  isbn: { type: String, required: true, minlength: 5, maxlength: 100 },
  author: { type: String, required: true, minlength: 5, maxlength: 100 },
  publishedYear: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  quantity: { type: Number, default: 0, required: true, min: 0 },
  price: { type: Number, default: 0, min: 0, required: true },
  description: { type: String, required: true, minlength: 5, maxlength: 1000 },
  cover: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Book", BookSchema);
