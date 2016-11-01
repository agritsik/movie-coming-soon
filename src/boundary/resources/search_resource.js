"use strict";

const express = require('express');
const searchAction = require('src/action/search_action');

module.exports = express.Router()
    .get('/', (req, res) => {

        searchAction(req.query.s)
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err));

    });

