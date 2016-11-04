const MongoClient = require('mongodb').MongoClient;

let db;
module.exports.init = () => {
      return new Promise((resolve, reject) =>{
        MongoClient.connect(process.env.MONGO_URL, (err, connect) => {
            if(err) reject(err);
            console.log("Mongo connection is established");
            db = connect;
            resolve();
        });
    });
};

module.exports.create = (email, movie) => {

    return db.collection('movies')
        .insertOne({email: email, movie: movie});

};


