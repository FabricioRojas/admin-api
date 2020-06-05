
var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.key, function (err, validated) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.validated = validated;
        next();
    });
}