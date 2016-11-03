"use strict";

const express = require('express');
const createReminderAction = require('src/action/create_reminder_action');

module.exports = express.Router()
    .post('/', (req, res, next) => {

        createReminderAction(req.body.imdbID, req.body.email)
            .then(data => res.status(201).send({insertedCount: data}))
            .catch(next);

    });