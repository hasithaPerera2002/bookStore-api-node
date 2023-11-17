const Book = require("../model/bookSchema");
const asyncErrorHandler = require("../util/AsyncErrorHandler");

const getAll = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ message: "Get all books" });
});

const getBook = asyncErrorHandler(async (req, res, next) => {});

const createBook = asyncErrorHandler(async (req, res, next) => {});

const updateBook = asyncErrorHandler(async (req, res, next) => {});

const deleteBook = asyncErrorHandler(async (req, res, next) => {});

module.exports = { getAll, getBook, createBook, updateBook, deleteBook };
