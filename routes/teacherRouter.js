const express = require('express');

const teacherController = require('../controllers/teacherController');
const teacherValidator = require('../validations/teacherValidations');

const router = express.Router();

router
  .route('/')
  .get(teacherController.getAllTeachers)
  .post(
    teacherValidator.checkBody,
    teacherValidator.makeLowerCase,
    teacherController.addNewTeacher,
  );

module.exports = router;
