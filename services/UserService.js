var User = require('../models/User');
var jwt = require('jsonwebtoken');
var config = require('../config/config');


exports.listUsers = function ( callback) {
    User.find({}, {password: 0}, callback);
};

exports.createUser = function (data, callback) {
    User.create(data).then((user) => {

        var token = jwt.sign({ id: user._id }, config.key, {
            expiresIn: 86400
        });

        callback(null, { auth: true, token: token });
    }, (error) => {
        callback(error, null);
    });
};

exports.findUser = function (query, callback) {
    User.findOne(query, {password: 0}, callback);
};

exports.updateUserById = function (id, data, callback) {
    User.findByIdAndUpdate({
        _id: id
    }, data, (err, response) => {
        callback(err, response);
    });
}

exports.deleteUser = function (query, callback) {
    User.deleteOne(query, callback);
};