"use strict";

const MongoClient = require('mongodb').MongoClient;

module.exports = MongoClient.connect('mongodb://192.168.99.100:27017/csm');


