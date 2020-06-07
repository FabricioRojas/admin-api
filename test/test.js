var request = require('supertest');
var app = require('../index.js');
var expect  = require("chai").expect;
var tokenLogin;

describe('GET /', function () {
    it('Respond with Hello world', function () {
        request(app).get('/').expect('Hello world');
    });
});

describe('User login', function() {
    it('No username', function(done) {
        request(app).post('/login/')
        .set('Content-Type', 'application/json')
        .send('{"username":"", "password":"123456"}')
        .end(function(err,res){
            expect(res.status).to.equal(400);
            expect(JSON.parse(res.text).message).to.equal('Username is missing');
            tokenLogin = JSON.parse(res.text).token;
            done();
        })
    });
    it('No password', function(done) {
        request(app).post('/login/')
        .set('Content-Type', 'application/json')
        .send('{"username":"test@test.es", "password":""}')
        .end(function(err,res){
            expect(res.status).to.equal(400);
            expect(JSON.parse(res.text).message).to.equal('Password is missing');
            tokenLogin = JSON.parse(res.text).token;
            done();
        })
    });
    it('Log in', function(done) {
        request(app).post('/login/')
        .set('Content-Type', 'application/json')
        .send('{"username":"test@test.es", "password":"123456"}')
        .end(function(err,res){
            expect(res.status).to.equal(201);
            tokenLogin = JSON.parse(res.text).token;
            done();
        })
    });
});

describe('User CRUD', function() {
    var userId;
    it('Fail user creation', function(done) {
        request(app).post('/user/')
        .set('Content-Type', 'application/json')
        .send('{"username":"test@test.es", "password":"123456"}')
        .end(function(err,res){
            expect(res.status).to.equal(400);
            expect(JSON.parse(res.error.text).code).to.equal(11000);
            done();
        })
    });
    it('Find user by username', function(done) {
        request(app).get('/user/test@test.es/')
        .set('Authorization', "Bearer "+ tokenLogin)
        .end(function(err,res){
            expect(res.status).to.equal(200);
            userId = JSON.parse(res.text)._id;
            done();
        })
    });
    it('Delete test user', function(done) {
        request(app).delete('/user/delete/')
        .set('Content-Type', 'application/json')
        .set('Authorization', "Bearer "+ tokenLogin)
        .send('{"id": "'+userId+'"}')
        .end(function(err,res){
            expect(res.status).to.equal(202);
            done();
        })
    });
    it('Fail to find user by username', function(done) {
        request(app).get('/user/test@test.es/')
        .set('Authorization', "Bearer "+ tokenLogin)
        .end(function(err,res){
            expect(res.status).to.equal(204);
            expect('No user found');
            done();
        })
    });
    it('Success user creation', function(done) {
        request(app).post('/user/')
        .set('Content-Type', 'application/json')
        .send('{"username":"test@test.es", "password":"123456"}')
        .end(function(err,res){
            expect(res.status).to.equal(201);
            done();
        })
    });
});