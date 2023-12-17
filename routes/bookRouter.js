const express = require('express');

const bookController = require('../controllers/bookController');
const bookValidator = require('../validations/bookValidations');

const router = express.Router();

router.param('title', bookValidator.checkTitleExists);

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(
    bookValidator.checkBody,
    bookValidator.makeLowerCase,
    bookValidator.checkDuplicateTitle,
    bookController.addNewBook,
  );

router
  .route('/:title')
  .get(bookController.getBookByTitle)
  .put(
    bookValidator.checkBody,
    bookValidator.makeLowerCase,
    bookValidator.checkDuplicateTitle,
    bookValidator.ignoreTitle,
    bookController.updateBook,
  )
  .delete(bookController.deleteBook);

module.exports = router;
