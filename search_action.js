"use strict";
const request = require('request');
const redis = require('./redis');

const OMDB_URL = 'http://www.omdbapi.com/'; // todo: settings

module.exports = (title, year) => {
    return new Promise((resolve, reject)=> {
        redis.get(`q:${year}:${title}`, (err, reply) => {
            if (reply != null) {
                resolve(reply);
            } else {
                request(`${OMDB_URL}?s=${title}&y=${year}&type=movie`, (err, response, body) => {
                    redis.setex(`q:${year}:${title}`, 3600, body);
                    resolve(body);
                });
            }
        })
    });
};