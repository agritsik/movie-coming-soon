"use strict"; // todo: do we need strict?

const express = require('express');
const searchAction = require('./../search_action');
const detailAction = require('./../detail_action');

let router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Coming soon movies API</h1>');
});

router.get('/search', (req, res) => {

    // thanks to: http://exploringjs.com/es6/ch_promises.html#_map-via-promiseall
    const years = [2016, 2017];
    Promise
        .all(years.map(e => searchAction(req.query.s, e)))
        .then(r => {
            const map = r.map(e => JSON.parse(e).Search); // todo: check if arr is null
            res.send([].concat.apply([], map));
        }).catch(err => console.log(err));
});

router.post('/reminders', (req, res) => {
    detailAction(req.body.imdbID, req.body.email)
        .then(r => res.status(201).send())
        .catch(err => res.status(500).send(err));
});

module.exports = router;

// todo: function declaration http://stackoverflow.com/a/336868/5253591
// todo: modules http://stackoverflow.com/a/10328308/5253591