const mongo = require('mongodb').MongoClient;
const logger = require('winston');

class MongoClient {

    init() {
        return new Promise((resolve, reject) => {
            mongo.connect(process.env.MONGO_URL, (err, connect) => {
                if (err) reject(err);
                logger.info('Mongo connection is established');
                this.db = connect;
                resolve();
            });
        });
    }

    create(email, movie) {
        return this.db.collection('movies')
            .insertOne({email: email, movie: movie});
    }

}

module.exports = new MongoClient();
