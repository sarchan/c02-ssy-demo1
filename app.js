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

// Routes
app.use('/', index);
app.use('/noch', noch);
app.use('/calc', calcRouter);

module.exports = app;
