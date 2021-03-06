var TaskService = require('../services/TaskService');

exports.list = function (req, res) {
    TaskService.list(function (error, response) {
        if (response) {
            res.status(200).send(response);
            return;
        }else{
            res.status(204).send('No tasks found');
            return;
        }
    });
};

exports.create = function (req, res, next) {
    var body = new Task(req.body);
    if (!body.name) {
        res.status(400).send('Name is missing');
        return;
    }
    if (!body.project) {
        res.status(400).send('Project is missing');
        return;
    }

    TaskService.create(body, function (error, response) {
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
        _id: params.id
    };
    TaskService.find(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }else{
            res.status(204).send('No task found');
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
    TaskService.updateById(body.id, updateData, (err, response) => {
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
    TaskService.delete(query, function (error, response) {
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

class Task {
    constructor(taskData) {
        this.name = taskData.name ? taskData.name : null;
        this.project = taskData.project ? taskData.project : null;
    }
}