const Book = require("../model/bookSchema");

const getAll = async (req, res) => {
  res.status(200).json({ message: "Get all books" });
};

const getBook = async (req, res) => {};

const createBook = async (req, res) => {};

const updateBook = async (req, res) => {};

const deleteBook = async (req, res) => {};

module.exports = { getAll, getBook, createBook, updateBook, deleteBook };
