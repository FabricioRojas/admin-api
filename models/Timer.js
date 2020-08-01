var mongoose = require('mongoose');

const TimerSchema  = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date
    },
    loged: {
        type: Number
    }
})

const Timer = mongoose.model('Timer', TimerSchema);
Timer.createIndexes();
module.exports = Timer;
