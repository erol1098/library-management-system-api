const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bookRouter = require('./routes/bookRouter');
const studentRouter = require('./routes/studentRouter');
const teacherRouter = require('./routes/teacherRouter');

const app = express();

//MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/teachers', teacherRouter);

module.exports = app;
