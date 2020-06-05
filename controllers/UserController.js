var UserService = require('../services/UserService');
var bcrypt = require('bcrypt');

exports.createUser = function (req, res, next) {
    var body = new User(req.body);
    if (!body.username) {
        res.status(400).send('Username is missing');
        return;
    }
    if (!body.password) {
        res.status(400).send('Password is missing');
        return;
    }

    UserService.createUser(body, function (error, response) {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
}

class User {
    constructor(userData) {
        this.username = userData.username || '';
        this.password = bcrypt.hashSync(userData.password, 8) || '';
    }
}