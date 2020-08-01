var Role = require('../models/Role');

exports.list = function (callback) {
    Role.find({}, function(err, found){
        if(err) return callback(err, null);
        return callback(null, found);
    });
};

exports.create = function (data, callback) {
    Role.create(data).then((role) => {
        callback(null, role);
    }, (error) => {
        callback(error, null);
    });
};

exports.find = function (query, callback) {
    Role.findOne(query, callback);
};

exports.updateById = function (id, data, callback) {
    Role.findByIdAndUpdate({_id: id}, JSON.parse(data), (err, response) => {
        callback(err, response);
    });
}

exports.delete = function (query, callback) {
    Role.deleteOne(query, callback);
};