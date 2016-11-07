const request = require('supertest');
const app = require('src/app');
const mongo = require('src/boundary/db/mongo_client');
const redis = require('src/boundary/cache/redis_client');
const logger = require('winston');
logger.level = 'error';


describe('', ()=> {
    before((done)=> {
        Promise.all([mongo.init(), redis.init()]).then(done());
    });

    describe('GET /', ()=> {
        it('should be 200', (done)=> {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect(200, '<h1>Coming soon movies API</h1>', done);
        });
    });

    describe('GET /search', ()=> {
        it('should return empty array', (done)=> {
            request(app)
                .get('/search')
                .set('Accept', 'application/json')
                .expect(200, '[]', done);
        });
    });

    describe('GET /search?s=woman', ()=> {
        it('should return "A Man and a Woman" movie', (done)=> {
            request(app)
                .get('/search?s=woman')
                .set('Accept', 'application/json')
                .expect(200, /A Man and a Woman/, done);
        });
    });
});
