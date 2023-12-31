module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '123456',
  DB: 'library_db',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  sequelize: {
    force: false,
    alter: true,
  },
};
