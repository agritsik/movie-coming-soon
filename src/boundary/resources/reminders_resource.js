const express = require('express');
const createReminderAction = require('src/action/create_reminder_action');
const createReminderActionGen = require('src/action/create_reminder_action_gen');

module.exports = express.Router()
    .post('/', (req, res, next) => {

        let action = process.env.GENERATORS == 'true'
            ? createReminderActionGen
            : createReminderAction;

        if(req.body.imdbID == null || req.body.email == null) {
            res.status(400).send({error: "Validation error"})
        }
        action(req.body.imdbID, req.body.email)
            .then(data => res.status(201).send({insertedCount: data}))
            .catch(next);

    });