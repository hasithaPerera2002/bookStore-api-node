const Book = require("../model/bookSchema");
const asyncErrorHandler = require("../util/asyncErrorHandler");
const CustomError = require("../util/customError");

const getAll = asyncErrorHandler(async (req, res, next) => {
  const { featured, category, author, sort } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (category) {
    queryObject.category = category;
  }

  if (author) {
    queryObject.author = author;
  }

  let filteredBookList = Book.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    filteredBookList = filteredBookList.sort(sortList);
  } else {
    filteredBookList = filteredBookList.sort("-publishedYear");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const startIndex = (page - 1) * limit;

  filteredBookList = filteredBookList.skip(startIndex).limit(limit);

  const books = await filteredBookList;

  res.status(200).json({ books, nbHits: books.length });
});

const getBook = asyncErrorHandler(async (req, res, next) => {
  await Book.findById(req.params.id).then((book) => {
    console.log(req.params.id);
    if (!book) {
      console.log(book);
      throw new CustomError("Book not found", 404);
    }
    res.status(200).json({ book });
  });
});

const createBook = asyncErrorHandler(async (req, res, next) => {
  const book = new Book({
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
  });
  await book.save().then((book) => {
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
