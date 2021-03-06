var bcrypt = require('bcrypt');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var RoleService = require('.//RoleService');


exports.authenticate = function (user, callback) {
    User.findOne({username: user.username}).then((found) => {
        if(!found) return callback("User not found", null);

        bcrypt.compare(user.password, found.password, function(err, result) {
            if(err) return callback(err, null);
            if(!result) return callback(null, { auth: false, message: 'Failed to authenticate token.' });

            RoleService.find({_id: found.role}, function (error, response) {
                if(err) return callback(err, null);
                if(!response) return callback(null, { auth: false, message: 'Failed to validate role.' });
                var token = jwt.sign({ id: found._id, role : response.name }, config.key, {
                    expiresIn: 86400
                });
                return callback(null, { auth: true, token: token });
            });
        });
    })
};

exports.list = function (callback) {
    User.find({}, {password: 0}, function(err, found){
        if(err) return callback(err, null);
        return callback(null, found);
    });
};

exports.create = function (data, callback) {
    User.create(data).then((user) => {
        callback(null, user);
    }, (error) => {
        callback(error, null);
    });
};

exports.find = function (query, callback) {
    User.findOne(query, {password: 0}, callback);
};

exports.updateById = function (id, data, callback) {
    User.findByIdAndUpdate({
        _id: id
    }, data, (err, response) => {
        callback(err, response);
    });
}

exports.delete = function (query, callback) {
    User.deleteOne(query, callback);
};