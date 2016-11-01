"use strict";

const MongoClient = require('mongodb').MongoClient;

module.exports.init = () => {
      return new Promise((resolve, reject) =>{
        MongoClient.connect(process.env.MONGO_URL, (err, db) => {
            if(err) reject(err);
            console.log("Mongo connection is established");
            module.exports.db = db;
            resolve();
        });
    });
};


