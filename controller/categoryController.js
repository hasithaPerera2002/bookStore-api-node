const asyncErrorHandler = require("../util/asyncErrorHandler");
const CustomError = require("../util/customError");
const Category = require("../model/categorySchema");

const create = asyncErrorHandler(async (req, res, next) => {
  await Category.create(req.body).then((category) => {
    res.status(201).json({ category });
  });
});

const update = asyncErrorHandler(async (req, res, next) => {
  Category.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
      },
    }
  ).then((category) => {
    res.status(200).json({ category });
  });
});

const deleteCategory = asyncErrorHandler(async (req, res, next) => {
  Category.deleteOne({ _id: req.params.id }).then((category) => {
    if (category) {
      throw new CustomError("Category not found", 404);
    }
    res.status(204).json({ category });
  });
});

module.exports = { create, update, deleteCategory };
