const db = require('../models');

const Students = db.student;

const checkDuplicateStudentId = async (req, res, next) => {
  try {
    const student = await Students.findOne({
      where: { studentId: req.body.studentId },
    });
    // for PUT requests
    if (req.method === 'PUT') {
      if (student && +student.studentId !== +req.params.studentId) {
        return res
          .status(400)
          .send({ message: 'Bu numarada bir öğrenci zaten var.' });
      }
      return next();
    }
    // for POST requests
    if (student) {
      return res
        .status(400)
        .send({ message: 'Bu numarada bir öğrenci zaten var.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkStudentIdExists = async (req, res, next) => {
  try {
    const student = await Students.findOne({
      where: { studentId: req.params.studentId },
    });
    if (!student) {
      return res
        .status(404)
        .send({ message: 'Aradığınız öğrenci bulunamadı.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkBody = async (req, res, next) => {
  if (!req.body?.studentId || !req.body?.firstName || !req.body?.lastName) {
    return res.status(400).send({ message: 'Eksik bilgi girdiniz.' });
  }
  next();
};

const makeLowerCase = async (req, res, next) => {
  req.body.firstName = req.body.firstName.toLocaleLowerCase();
  req.body.lastName = req.body.lastName.toLocaleLowerCase();
  next();
};

const ignoreStudentId = async (req, res, next) => {
  console.log('req.body.studentId', req.body.studentId);
  console.log('req.params.studentId', req.params.studentId);
  req.body.studentId = req.params.studentId;
  next();
};

module.exports = {
  checkDuplicateStudentId,
  checkStudentIdExists,
  checkBody,
  makeLowerCase,
  ignoreStudentId,
};
