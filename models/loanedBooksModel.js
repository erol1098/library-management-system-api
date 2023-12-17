const LOAN_STATUS = require('../enums/loanStatus');

module.exports = (sequelize, DataTypes) => {
  const LoanedBooks = sequelize.define(
    'loanedBooks',
    {
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loanedOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      dueBack: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      loanStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: LOAN_STATUS.ACTIVE,
      },
    },
    {
      timestamps: false,
    },
  );
  return LoanedBooks;
};
