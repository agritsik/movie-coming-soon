"use strict";

const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hi there');
});

module.exports = router;
