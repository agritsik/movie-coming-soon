require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/', require('src/boundary/resources/index_resource'));
app.use('/search', require('src/boundary/resources/search_resource'));
app.use('/reminders', require('src/boundary/resources/reminders_resource'));


// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err.stack);

  res.json({
    message: err.message,
    error: err.stack
  });
});


module.exports = app;
