const db = require('../../models');

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
      book: `${book.title} - ${book.author}`,
      student: `${student.firstName} ${student.lastName}`,
      teacher: `${teacher.firstName} ${teacher.lastName}`,
      loanedOn,
      dueBack,
      loanStatus,
    };

    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = responseConverter;
