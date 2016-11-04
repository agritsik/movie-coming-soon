const express = require('express');

module.exports = express.Router()
    .get('/', (req, res) => {
        res.send('<h1>Coming soon movies API</h1>');
    });


