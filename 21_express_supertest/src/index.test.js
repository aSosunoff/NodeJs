const supertest = require('supertest');
const assert = require('assert');

const {server} = require('./index');

it('should return Hello Test', done => {
    supertest(server)
        .get('/')
        .expect('Hello Test')
        .end(done);
});

it('should return NotFound with status 404', done => {
    supertest(server)
        .get('/error')
        .expect(404)
        .expect('NotFound')
        .end(done);
});

it('should return user', done => {
    supertest(server)
        .get('/user')
        .expect(res => {
            assert.deepEqual(res.body, {name: "Tom", age: 22});
        })
        .end(done);
});