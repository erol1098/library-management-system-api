const db = require('../models');

const Teachers = db.teacher;

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teachers.findAll();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addNewTeacher = async (req, res) => {
  try {
    const teacher = await Teachers.create(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllTeachers,
  addNewTeacher,
};
