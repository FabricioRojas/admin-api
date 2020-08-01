var RoleService = require('../services/RoleService');

exports.list = function (req, res) {
    RoleService.list(function (error, response) {
        if (response) {
            res.status(200).send(response);
            return;
        }else{
            res.status(204).send('No roles found');
            return;
        }
    });
};

exports.create = function (req, res, next) {
    var body = new Role(req.body);
    
    if (!body.name) {
        res.status(400).send('Name is missing');
        return;
    }
    if (!body.permissions) {
        res.status(400).send('Permissions is missing');
        return;
    }

    RoleService.create(body, function (error, response) {
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
    RoleService.find(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }else{
            res.status(204).send('No role found');
        }
    });
};

exports.updateById = function (req, res) {
    var body = req.body;

    if (!body.id) {
        res.status(400).send('Id is missing');
        return;
    }
    var updateData = JSON.parse(body.data) || {}
    if(updateData.permissions) updateData.permissions = updateData.permissions.split(",");

    RoleService.updateById(body.id, JSON.stringify(updateData), (err, response) => {
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
    RoleService.delete(query, function (error, response) {
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

class Role {
    constructor(roleData) {
        this.name = roleData.name ? roleData.name.toLowerCase() : null;
        this.permissions = roleData.permissions ? roleData.permissions.split(",") : null;
    }
}