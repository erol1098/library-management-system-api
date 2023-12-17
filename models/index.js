const { Sequelize, DataTypes } = require('sequelize');

const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// TABLE RELATIONSHIPS
db.student = require('./studentModel')(sequelize, DataTypes);
db.teacher = require('./teacherModel')(sequelize, DataTypes);
db.loanedBook = require('./loanedBooksModel')(sequelize, DataTypes);
db.book = require('./bookModel')(sequelize, DataTypes);

db.student.hasMany(db.loanedBook, { foreignKey: 'studentId' });
db.loanedBook.belongsTo(db.student, { foreignKey: 'studentId' });

db.teacher.hasMany(db.loanedBook, { foreignKey: 'teacherId' });
db.loanedBook.belongsTo(db.teacher, { foreignKey: 'teacherId' });

db.sequelize
  .sync({
    force: dbConfig.sequelize.force,
    alter: dbConfig.sequelize.alter,
  })
  .then(() => {
    console.log('Drop and re-sync db');
  });

module.exports = db;
