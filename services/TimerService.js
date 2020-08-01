var Timer = require('../models/Timer');

exports.list = function (callback) {
    Timer.find({}, function(err, found){
        if(err) return callback(err, null);
        return callback(null, found);
    });
};

exports.create = function (data, callback) {
    Timer.create(data).then((timer) => {
        callback(null, timer);
    }, (error) => {
        callback(error, null);
    });
};

exports.find = function (query, callback) {
    Timer.findOne(query, callback);
};

exports.updateById = function (id, data, callback) {
    Timer.findByIdAndUpdate({_id: id}, JSON.parse(data), (err, response) => {
        callback(err, response);
    });
}

exports.delete = function (query, callback) {
    Timer.deleteOne(query, callback);
};