var Task = require('../models/Task');

exports.list = function (callback) {
    Task.find({}, function(err, found){
        if(err) return callback(err, null);
        return callback(null, found);
    });
};

exports.create = function (data, callback) {
    Task.create(data).then((task) => {
        callback(null, task);
    }, (error) => {
        callback(error, null);
    });
};

exports.find = function (query, callback) {
    Task.findOne(query, callback);
};

exports.updateById = function (id, data, callback) {
    Task.findByIdAndUpdate({_id: id}, JSON.parse(data), (err, response) => {
        callback(err, response);
    });
}

exports.delete = function (query, callback) {
    Task.deleteOne(query, callback);
};