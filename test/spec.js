const request = require('supertest');
const app = require('src/app');
const mongo = require('src/boundary/db/mongo_client');
const redis = require('src/boundary/cache/redis_client');
const logger = require('winston');
logger.level = 'error';


describe('', ()=> {
    before((done)=> {
        Promise.all([mongo.init(), redis.init()]).then(()=>done());
    });

    describe('GET /', ()=> {
        it('should be 200', (done)=> {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('<h1>Coming soon movies API</h1>')
                .end(done);
        });
    });

    describe('GET /search', ()=> {
        it('should return 200 and an empty array if query is empty', (done)=> {
            request(app)
                .get('/search')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('[]')
                .end(done);;
        });
        it('should return 200 and "A Man and a Woman" if query is ?s=woman', (done)=> {
            request(app)
                .get('/search?s=woman')
                .set('Accept', 'application/json')
                .expect(200)
                .expect(/A Man and a Woman/)
                .end(done);
        });
    });

    describe('POST /reminders', ()=> {
        it('should return 201 and insertedCount if body is a valid object', (done)=> {
            request(app)
                .post('/reminders')
                .send({email: "a.gritsiK@gmail.com", imdbID: "tt4244162"})
                .set('Accept', 'application/json')
                .expect(201)
                .expect(/{"insertedCount":1}/)
                .end(done);
        });
        it('should return 400 and error message if body is empty', (done)=> {
            request(app)
                .post('/reminders')
                .send('')
                .set('Accept', 'application/json')
                .expect(400)
                .expect(/Validation error/)
                .end(done);
        });
        it('should return 400 and error message if email is not presented', (done)=> {
            request(app)
                .post('/reminders')
                .send({imdbID: "tt4244162"})
                .set('Accept', 'application/json')
                .expect(400)
                .expect(/Validation error/)
                .end(done);
        });
    });
});
