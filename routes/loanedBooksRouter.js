const express = require('express');

const loanedBooksController = require('../controllers/loanedBooksController');
const loanedBooksValidator = require('../validations/loanedBooksValidations');

const router = express.Router();

router
  .route('/')
  .get(loanedBooksController.getAllLoanedBooks)
  .post(
    loanedBooksValidator.checkBody,
    loanedBooksValidator.checkBookExists,
    loanedBooksValidator.checkIfBookLoanedBefore,
    loanedBooksValidator.checkStudentExists,
    loanedBooksValidator.checkTeacherExists,
    loanedBooksController.addLoanedBook,
  );

router
  .route('/:studentId')
  .get(
    loanedBooksValidator.checkStudentExistsWithId,
    loanedBooksController.getStudentLoanedBooks,
  );

module.exports = router;
