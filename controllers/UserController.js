var UserService = require('../services/UserService');
var bcrypt = require('bcrypt');


exports.login = function (req, res) {
    var user = req.body;
    if (!user.username) {
        res.status(400).send({ auth: false, message: 'Username is missing' });
        return;
    }
    if (!user.password) {
        res.status(400).send({ auth: false, message: 'Password is missing' });
        return;
    }

    UserService.authenticate(user, function (error, response) {
        if (response) {
            res.status(201).send(response);
            return;
        } else if (error) {
            res.status(400).send(error);
            return;
        }
    });
};

exports.list = function (req, res) {
    UserService.list(function (error, response) {
        if (response) {
            res.status(200).send(response);
            return;
        }else{
            res.status(204).send('No users found');
            return;
        }
    });
};

exports.create = function (req, res, next) {
    var body = new User(req.body);
    if (!body.username) {
        res.status(400).send('Username is missing');
        return;
    }
    if (!body.password) {
        res.status(400).send('Password is missing');
        return;
    }

    UserService.create(body, function (error, response) {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

exports.find = function (req, res) {
    var params = req.params || {};
    var query = {
        username: params.username
    };
    UserService.find(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }else{
            res.status(204).send('No user found');
        }
    });
};

exports.updateById = function (req, res) {
    var body = req.body;

    if (!body.id) {
        res.status(400).send('Id is missing');
        return;
    }
    var updateData = body.data || {}
    UserService.updateById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
};

exports.delete = function (req, res) {
    var body = req.body || {};
    var query = {
        _id: body.id
    };
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    UserService.delete(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(202).send(body);
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    message: 'No data found'
                });
            }
        }
    });
};

class User {
    constructor(userData) {
        this.username = userData.username ? userData.username : null;
        this.password = userData.password ? bcrypt.hashSync(userData.password, 8) : null;
        this.firstname = userData.firstname ? userData.firstname : null;
    }
}