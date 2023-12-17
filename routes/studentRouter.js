const express = require('express');

const studentController = require('../controllers/studentController');
const studentValidator = require('../validations/studentValidations');

const router = express.Router();

router.param('studentId', studentValidator.checkStudentIdExists);

router
  .route('/')
  .get(studentController.getAllStudents)
  .post(
    studentValidator.checkBody,
    studentValidator.makeLowerCase,
    studentValidator.checkDuplicateStudentId,
    studentController.addNewStudent,
  );

router
  .route('/:studentId')
  .get(studentController.getStudentByStudentId)
  .put(
    studentValidator.checkBody,
    studentValidator.makeLowerCase,
    studentValidator.checkDuplicateStudentId,
    studentValidator.ignoreStudentId,
    studentController.updateStudent,
  )
  .delete(studentController.deleteStudent);

module.exports = router;
