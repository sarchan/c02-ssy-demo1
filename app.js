const express = require('express');
const logger = require('morgan');

// Generic application setup
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Load routes into variables
const index = require('./routes/index');
const noch = require('./routes/noch');
const calcRouter = require('./routes/calc');
const benutzerinnen = require('./routes/user');

// Routes
app.use('/', index);
app.use('/noch', noch);
app.use('/calc', calcRouter);
app.use('/user', benutzerinnen);

module.exports = app;
