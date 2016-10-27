"use strict";

const express = require('express');
const request = require('request');

const OMDB_URL = 'http://www.omdbapi.com/?s=';

let router = express.Router();

router.get('/', (req, res) => {
    res.send('hi there');
});

router.get('/search', (req, res) => {

    request(OMDB_URL + req.query.s, (err, response, body) => {
        res.send(body);
    });

});

module.exports = router;
