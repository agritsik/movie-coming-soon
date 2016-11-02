"use strict";

const express = require('express');
const searchAction = require('src/action/search_action');

module.exports = express.Router()
    .get('/', (req, res, next) => {

        searchAction(req.query.s)
            .then(data => res.send(data))
            .catch(err => next(err));

    });

