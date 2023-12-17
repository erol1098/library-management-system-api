const express = require('express');

const bookController = require('../controllers/bookController');

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.addNewBook);

router
  .route('/:title')
  .get(bookController.getBookByTitle)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
