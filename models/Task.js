var mongoose = require('mongoose');

const TaskSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    timers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Timer',
        required: true
    }]
})

const Task = mongoose.model('Task', TaskSchema);
Task.createIndexes();
module.exports = Task;
