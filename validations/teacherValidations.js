// const db = require('../models');

// const Teachers = db.teacher;

const checkBody = async (req, res, next) => {
  if (!req.body?.firstName || !req.body?.lastName) {
    return res.status(400).send({ message: 'Eksik bilgi girdiniz.' });
  }
  next();
};

const makeLowerCase = async (req, res, next) => {
  req.body.firstName = req.body.firstName.toLocaleLowerCase();
  req.body.lastName = req.body.lastName.toLocaleLowerCase();
  next();
};

module.exports = {
  checkBody,
  makeLowerCase,
};
