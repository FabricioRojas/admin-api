var User = require('../models/User');
var jwt = require('jsonwebtoken');
var config = require('../config/config');


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
