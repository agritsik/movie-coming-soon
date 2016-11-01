"use strict";

const request = require('request');

const OMDB_URL = 'http://www.omdbapi.com/'; // todo: move to settings

module.exports.searchByTitle = (title, year) => {
    return new Promise((resolve, reject) => {

        const url = `${OMDB_URL}?s=${title}&y=${year}&type=movie`;
        console.log(`Request to ${url}`); // todo: move to interceptor

        request(url, (err, response, body) => {
            if (err) reject(err);
            resolve(body);
        });
    });
};

module.exports.searchById = (id) => {
    return new Promise((resolve, reject) => {

        const url = `${OMDB_URL}?i=${id}&plot=full&r=json`;
        console.log(`Request to ${url}`); // todo: move to interceptor

        request(url, (err, response, body) => {
            if (err) reject(err);
            resolve(body);
        });
    });

}