const db = require('../models');

const Books = db.book;

const checkIdExists = async (req, res, next) => {
  try {
    const book = await Books.findOne({ where: { id: req.params.id } });
    if (!book) {
      return res.status(404).send({ message: 'Aradığınız kitap bulunamadı.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkDuplicateTitle = async (req, res, next) => {
  try {
    const book = await Books.findOne({ where: { title: req.body.title } });
    // for PUT requests
    if (req.method === 'PUT') {
      if (book && book.title !== req.params.title) {
        return res
          .status(400)
          .send({ message: 'Bu isimde bir kitap zaten var.' });
      }
      return next();
    }
    // for POST requests
    if (book) {
      return res
        .status(400)
        .send({ message: 'Bu isimde bir kitap zaten var.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkTitleExists = async (req, res, next) => {
  try {
    const book = await Books.findOne({ where: { title: req.params.title } });
    if (!book) {
      return res.status(404).send({ message: 'Aradığınız kitap bulunamadı.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkBody = async (req, res, next) => {
  if (!req.body?.title || !req.body?.author) {
    return res.status(400).send({ message: 'Eksik bilgi girdiniz.' });
  }
  next();
};

const makeLowerCase = async (req, res, next) => {
  req.body.title = req.body.title.toLocaleLowerCase();
  req.body.author = req.body.author.toLocaleLowerCase();
  req.body.genre = req.body.genre?.toLocaleLowerCase();
  next();
};

const ignoreTitle = async (req, res, next) => {
  req.body.title = req.params.title;
  next();
};

module.exports = {
  checkIdExists,
  checkDuplicateTitle,
  checkTitleExists,
  checkBody,
  makeLowerCase,
  ignoreTitle,
};
