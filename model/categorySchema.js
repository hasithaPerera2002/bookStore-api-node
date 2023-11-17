const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 0, maxlength: 100 },
});

module.exports = mongoose.model("Category", CategorySchema);
