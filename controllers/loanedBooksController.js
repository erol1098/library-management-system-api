const db = require('../models');

const LOAN_STATUS = require('../enums/loanStatus');

const LoanedBooks = db.loanedBook;

const getAllLoanedBooks = async (req, res) => {
  try {
    const loanedBooks = await LoanedBooks.findAll({
      where: { loanStatus: LOAN_STATUS.ACTIVE },
    });

    res.status(200).json(loanedBooks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addLoanedBook = async (req, res) => {
  try {
    const loanedBook = await LoanedBooks.create(req.body);
    res.status(201).json(loanedBook);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getStudentLoanedBooks = async (req, res) => {
  try {
    const loanedBooks = await LoanedBooks.findAll({
      where: { studentId: req.params.studentId },
    });
    res.status(200).json(loanedBooks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllLoanedBooks,
  addLoanedBook,
  getStudentLoanedBooks,
};
