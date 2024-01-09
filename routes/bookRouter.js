const express = require('express');

const bookController = require('../controllers/bookController');
const bookValidator = require('../validations/bookValidations');
const addCorsHeader = require('../middlewares/addCorsHeader');

const router = express.Router();

router.param('id', bookValidator.checkIdExists);

//implemet addCorsHeader middleware to all routes
router.use(addCorsHeader);

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
  .route('/:id')
  .get(bookController.getBookById)
  .put(
    bookValidator.checkBody,
    bookValidator.makeLowerCase,
    bookValidator.checkDuplicateTitle,
    bookValidator.ignoreTitle,
    bookController.updateBook,
  )
  .delete(bookController.deleteBook);

module.exports = router;
