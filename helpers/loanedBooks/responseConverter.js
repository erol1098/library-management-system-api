const db = require('../../models');
const capitalize = require('../capitalizeString');
const convertLocaleDateString = require('../convertLocaleDateString');

const Books = db.book;
const Students = db.student;
const Teachers = db.teacher;

const responseConverter = async (data) => {
  try {
    const { bookId, studentId, teacherId, loanedOn, dueBack, loanStatus } =
      data;

    const book = await Books.findOne({ where: { id: bookId } });
    const student = await Students.findOne({ where: { id: studentId } });
    const teacher = await Teachers.findOne({ where: { id: teacherId } });

    const response = {
      id: data.id,
      book: `${capitalize(book.title)} - ${capitalize(book.author)}`,
      student: `${capitalize(student.firstName)} ${capitalize(
        student.lastName,
      )}`,
      teacher: `${capitalize(teacher.firstName)} ${capitalize(
        teacher.lastName,
      )}`,
      loanedOn: convertLocaleDateString(loanedOn),
      dueBack: convertLocaleDateString(dueBack),
      loanStatus,
    };

    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = responseConverter;
