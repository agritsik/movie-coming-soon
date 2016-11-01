"use strict";

const express = require('express');
const detailAction = require('src/action/detail_action');

module.exports = express.Router()
    .post('/', (req, res) => {

        detailAction(req.body.imdbID, req.body.email)
            .then(data => res.status(201).send({insertedCount: data}))
            .catch(err => res.status(500).send(err));

    });