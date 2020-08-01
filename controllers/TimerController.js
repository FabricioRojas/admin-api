var TimerService = require('../services/TimerService');

exports.list = function (req, res) {
    TimerService.list(function (error, response) {
        if (response) {
            res.status(200).send(response);
            return;
        }else{
            res.status(204).send('No timers found');
            return;
        }
    });
};

exports.create = function (req, res, next) {
    var body = new Timer(req.body);
    if (!body.task) {
        res.status(400).send('Task is missing');
        return;
    }
    if (!body.start) {
        res.status(400).send('Start is missing');
        return;
    }

    TimerService.create(body, function (error, response) {
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
    TimerService.find(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }else{
            res.status(204).send('No timer found');
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
    TimerService.updateById(body.id, updateData, (err, response) => {
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
    TimerService.delete(query, function (error, response) {
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

class Timer {
    constructor(timerData) {
        this.task = timerData.task ? timerData.task : null;
        this.start = timerData.start ? timerData.start : null;
    }
}