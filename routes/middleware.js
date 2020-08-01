
var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = tyset

function tyset(roles = []) {
    return [
        (req, res, next) => {
            
            var token = req.headers['authorization'] ? req.headers['authorization'].split(" ")[1] : null;
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
            
            jwt.verify(token, config.key, function (err, validated) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                
                if (roles.length && !roles.includes(validated.role)) return res.status(401).json({ message: 'Unauthorized' });
                
                req.validated = validated;
                next();
            });
        }
    ];
}
