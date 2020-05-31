var request = require('supertest');
var app = require('../index.js');

describe('GET /', function() {
    it('Respond with Hello world', function() {
        request(app).get('/').expect('Hello world');
    });
});