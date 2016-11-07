require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('winston');
logger.level = 'debug';

var app = express();
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use('/', require('src/boundary/resources/index_resource'));
app.use('/search', require('src/boundary/resources/search_resource'));
app.use('/reminders', require('src/boundary/resources/reminders_resource'));


// error handlers
app.use(function (err, req, res) {
    res.status(err.status || 500);
    logger.error(err);

    res.json({
        message: err.message,
        error: err.stack
    });
});


module.exports = app;
