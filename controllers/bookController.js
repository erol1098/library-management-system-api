const db = require('../models');

const Books = db.book;

const getAllBooks = async (req, res) => {
  try {
    const books = await Books.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getBookByTitle = async (req, res) => {
  try {
    const book = await Books.findOne({ where: { title: req.params.title } });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).send({ message: 'Aradığınız kitap bulunamadı.' });
  }
};

const addNewBook = async (req, res) => {
  try {
    const book = await Books.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Books.update(req.body, {
      where: { title: req.params.title },
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Books.destroy({ where: { title: req.params.title } });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookByTitle,
  addNewBook,
  updateBook,
  deleteBook,
};
