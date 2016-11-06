const express = require('express');
const searchAction = require('src/action/search_action');
const searchActionGen = require('src/action/search_action_gen');

module.exports = express.Router()
    .get('/', (req, res, next) => {

        let action = process.env.GENERATORS == 'true'
            ? searchActionGen
            : searchAction;

        action(req.query.s)
            .then(data => res.send(data))
            .catch(next);

    });

