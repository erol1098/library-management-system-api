const db = require('../models');

const Students = db.student;

const getAllStudents = async (req, res) => {
  try {
    const students = await Students.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getStudentByStudentId = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: { studentId: req.params.studentId },
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(404).send({ message: 'Aradığınız öğrenci bulunamadı.' });
  }
};

const addNewStudent = async (req, res) => {
  try {
    const student = await Students.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    await Students.update(req.body, {
      where: { studentId: req.params.studentId },
    });

    res
      .status(200)
      .json(
        await Students.findOne({ where: { studentId: req.params.studentId } }),
      );
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Students.destroy({
      where: { studentId: req.params.studentId },
    });
    res.status(204).json(student);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentByStudentId,
  addNewStudent,
  updateStudent,
  deleteStudent,
};
