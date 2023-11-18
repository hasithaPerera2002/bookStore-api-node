const Book = require("../model/bookSchema");
const asyncErrorHandler = require("../util/asyncErrorHandler");

const getAll = asyncErrorHandler(async (req, res, next) => {
  await Book.find().then((books) => {
    if (!books) {
      throw new CustomError("No books found", 404);
    }
    res.status(200).json({ books });
  });
});

const getBook = asyncErrorHandler(async (req, res, next) => {
  await Book.findById(req.params.id).then((book) => {
    if (!book) {
      throw new CustomError("Book not found", 404);
    }
    res.status(200).json({ book });
  });
});

const createBook = asyncErrorHandler(async (req, res, next) => {
  await Book.create(req.body).then((book) => {
    res.status(201).json({ book });
  });
});

const updateBook = asyncErrorHandler(async (req, res, next) => {
  Book.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        isbn: req.body.isbn,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
        category: req.body.category,
        cover: req.file.path,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        featured: req.body.featured,
        rating: req.body.rating,
        selled: req.body.selled,
      },
    }
  ).then((book) => {
    res.status(200).json({ book });
  });
});

const deleteBook = asyncErrorHandler(async (req, res, next) => {
  Book.deleteOne({ _id: req.params.id }).then((book) => {
    if (!book) {
      throw new CustomError("Book not found", 404);
    }
    res.status(204).json({ book });
  });
});

const updateQuantity = asyncErrorHandler(async (req, res, next) => {
  Book.updateOne(
    { _id: req.params.id },
    {
      $set: {
        quantity: req.body.quantity,
      },
    }
  ).then((book) => {
    res.status(200).json({ book });
  });
});

const updateBookImage = asyncErrorHandler(async (req, res, next) => {
  Book.updateOne(
    { _id: req.params.id },
    {
      $set: {
        cover: req.file.path,
      },
    }
  ).then((book) => {
    res.status(200).json({ book });
  });
});
module.exports = {
  getAll,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  updateQuantity,
  updateBookImage,
};
