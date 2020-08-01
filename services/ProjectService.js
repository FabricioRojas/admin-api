var Project = require('../models/Project');

exports.list = function (callback) {
    Project.find({}, function(err, found){
        if(err) return callback(err, null);
        return callback(null, found);
    });
};

exports.create = function (data, callback) {
    Project.create(data).then((project) => {
        callback(null, project);
    }, (error) => {
        callback(error, null);
    });
};

exports.find = function (query, callback) {
    Project.findOne(query, callback);
};

exports.updateById = function (id, data, callback) {
    Project.findByIdAndUpdate({_id: id}, JSON.parse(data), (err, response) => {
        callback(err, response);
    });
}

exports.delete = function (query, callback) {
    Project.deleteOne(query, callback);
};