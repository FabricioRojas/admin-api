var ProjectService = require('../services/ProjectService');

exports.list = function (req, res) {
    ProjectService.list(function (error, response) {
        if (response) {
            res.status(200).send(response);
            return;
        }else{
            res.status(204).send('No projects found');
            return;
        }
    });
};

exports.create = function (req, res, next) {
    var body = new Project(req.body);
    if (!body.name) {
        res.status(400).send('Name is missing');
        return;
    }

    ProjectService.create(body, function (error, response) {
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
    ProjectService.find(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }else{
            res.status(204).send('No project found');
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
    ProjectService.updateById(body.id, updateData, (err, response) => {
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
    ProjectService.delete(query, function (error, response) {
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

class Project {
    constructor(projectData) {
        this.name = projectData.name ? projectData.name : null;
    }
}