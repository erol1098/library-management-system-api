const db = require('../models');
const LOAN_STATUS = require('../enums/loanStatus');

const LoanedBooks = db.loanedBook;
const Books = db.book;
const Students = db.student;
const Teachers = db.teacher;

const checkBody = async (req, res, next) => {
  if (
    !req.body?.bookId ||
    !req.body?.studentId ||
    !req.body?.teacherId ||
    !req.body?.dueBack
  ) {
    return res.status(400).send({ message: 'Eksik bilgi girdiniz.' });
  }
  next();
};

const checkBookExists = async (req, res, next) => {
  try {
    const book = await Books.findOne({ where: { id: req.body.bookId } });
    if (!book) {
      return res.status(404).send({ message: 'Aradığınız kitap bulunamadı.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkIfBookLoanedBefore = async (req, res, next) => {
  try {
    const book = await LoanedBooks.findOne({
      where: { bookId: req.body.bookId, loanStatus: LOAN_STATUS.ACTIVE },
    });
    if (book) {
      return res.status(400).send({ message: 'Bu kitap zaten ödünç alınmış.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkStudentExists = async (req, res, next) => {
  try {
    const student = await Students.findOne({
      where: { id: req.body.studentId },
    });
    if (!student) {
      return res.status(404).send({ message: 'Yanlış öğrenci numarası.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkTeacherExists = async (req, res, next) => {
  try {
    const teacher = await Teachers.findOne({
      where: { id: req.body.teacherId },
    });
    if (!teacher) {
      return res.status(404).send({ message: 'Bu öğretmen bulunamadı.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkStudentExistsWithId = async (req, res, next) => {
  try {
    const student = await Students.findOne({
      where: { id: req.params.studentId },
    });
    if (!student) {
      return res.status(404).send({ message: 'Bu öğrenci bulunamadı.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  checkBody,
  checkBookExists,
  checkIfBookLoanedBefore,
  checkStudentExists,
  checkTeacherExists,
  checkStudentExistsWithId,
};
