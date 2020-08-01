var request = require('supertest');
var app = require('../index.js');
var expect  = require("chai").expect;
var tokenLogin;

var usernameTest = 'test@test.es';
var passTest = '123456';
var firstname = 'Testuser';

describe('GET /', function () {
    it('Respond with Hello world', function () {
        request(app).get('/').expect('Hello world');
    });
});

describe('User login', function() {
    it('No username', function(done) {
        request(app).post('/login/')
        .set('Content-Type', 'application/json')
        .send(`{"username":"", "password":"${passTest}"}`)
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
        .send(`{"username":"${usernameTest}", "password":""}`)
        .end(function(err,res){
            expect(res.status).to.equal(400);
            expect(JSON.parse(res.text).message).to.equal('Password is missing');
            tokenLogin = JSON.parse(res.text).token;
            done();
        })
    });
    it('Wrong user', function(done) {
        request(app).post('/login/')
        .set('Content-Type', 'application/json')
        .send(`{"username":"test@test.e", "password":"${passTest}"}`)
        .end(function(err,res){
            expect(res.status).to.equal(400);
            done();
        })
    });
    it('Wrong pass', function(done) {
        request(app).post('/login/')
        .set('Content-Type', 'application/json')
        .send(`{"username":"${usernameTest}", "password":"12345"}`)
        .end(function(err,res){
            expect(res.status).to.equal(201);
            expect(JSON.parse(res.text).message).to.equal('Failed to authenticate token.');
            done();
        })
    });
    it('Log in', function(done) {
        request(app).post('/login/')
        .set('Content-Type', 'application/json')
        .send(`{"username":"${usernameTest}", "password":"${passTest}"}`)
        .end(function(err,res){
            expect(res.status).to.equal(201);
            tokenLogin = JSON.parse(res.text).token;
            done();
        })
    });
});

describe('User CRUD', function() {
    var userId;

    it('User list', function(done) {
        request(app).get('/users')
        .set('Authorization', `Bearer ${tokenLogin}`)
        .set('Content-Type', 'application/json')
        .end(function(err,res){
            expect(res.status).to.equal(200);
            done();
        })
    });
    it('Fail user creation - duplication', function(done) {
        request(app).post('/user')
        .set('Content-Type', 'application/json')
        .send(`{"username":"${usernameTest}", "password":"${passTest}", "firstname":"${firstname}"}`)
        .end(function(err,res){
            expect(res.status).to.equal(400);
            expect(JSON.parse(res.error.text).code).to.equal(11000);
            done();
        })
    });
    it('Find user by username', function(done) {
        request(app).get(`/user/${usernameTest}`)
        .set('Authorization', `Bearer ${tokenLogin}`)
        .end(function(err,res){
            expect(res.status).to.equal(200);
            userId = JSON.parse(res.text)._id;
            done();
        })
    });
    it('Delete test user', function(done) {
        request(app).delete('/user')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${tokenLogin}`)
        .send(`{"id": "${userId}"}`)
        .end(function(err,res){
            expect(res.status).to.equal(202);
            done();
        })
    });
    it('Fail to find user by username', function(done) {
        request(app).get(`/user/${usernameTest}`)
        .set('Authorization', `Bearer ${tokenLogin}`)
        .end(function(err,res){
            expect(res.status).to.equal(204);
            expect('No user found');
            done();
        })
    });
    it('Fail user creation - no username', function(done) {
        request(app).post('/user')
        .set('Content-Type', 'application/json')
        .send(`{"password":"${passTest}"}`)
        .end(function(err,res){
            expect(res.status).to.equal(400);
            expect('Username is missing');
            done();
        })
    });
    it('Fail user creation - no password', function(done) {
        request(app).post('/user')
        .set('Content-Type', 'application/json')
        .send(`{"user":"${usernameTest}"}`)
        .end(function(err,res){
            expect(res.status).to.equal(400);
            expect('Password is missing');
            done();
        })
    });
    it('Success user creation', function(done) {
        request(app).post('/user')
        .set('Content-Type', 'application/json')
        .send(`{"username":"${usernameTest}", "password":"${passTest}", "firstname":"${firstname}"}`)
        .end(function(err,res){
            expect(res.status).to.equal(201);
            done();
        })
    });
});