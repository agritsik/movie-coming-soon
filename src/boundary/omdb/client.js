"use strict";

const request = require('request');

module.exports.searchByTitle = (title, year) => {
    return new Promise((resolve, reject) => {

        const url = `${process.env.OMDB_URL}?s=${title}&y=${year}&type=movie`;
        console.log(`Request to ${url}`); // todo: move to interceptor

        request(url, (err, response, body) => {
            if (err) return reject(err);
            resolve(body);
        });
    });
};

module.exports.searchById = (id) => {
    return new Promise((resolve, reject) => {

        const url = `${process.env.OMDB_URL}?i=${id}&plot=full&r=json`;
        console.log(`Request to ${url}`); // todo: move to interceptor

        request(url, (err, response, body) => {
            if (err) return reject(err);
            resolve(body);
        });
    });

}