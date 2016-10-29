"use strict";

const express = require('express');
const request = require('request');
const redis = require('redis');

const OMDB_URL = 'http://www.omdbapi.com/';

let router = express.Router();
let redisClient = redis.createClient(6379, '192.168.99.100');

redisClient.on("error", function (err) {
    console.log("Error " + err);
});

router.get('/', (req, res) => {
    res.send('hi there');
});

router.get('/search', (req, res) => {

    // todo: switch to promises
    getData(req.query.s, 2016, (result16) => {
        getData(req.query.s, 2017, (result17) => {
            let arr1 = JSON.parse(result16).Search;
            let arr2 = JSON.parse(result17).Search;
            res.send(arr1.concat(arr2));
        });
    });
});

function getData(title, year, cb) {
    redisClient.get(`q:${year}:${title}`, (err, reply) => {
        if (reply != null) {
            cb(reply);
        } else {
            request(`${OMDB_URL}?s=${title}&y=${year}&type=movie`, (err, response, body) => {
                redisClient.setex(`q:${year}:${title}`, 3600, body);
                cb(body);
            });
        }
    })
}

module.exports = router;
