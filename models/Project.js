var mongoose = require('mongoose');

const ProjectSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    }]
})

const Project = mongoose.model('Project', ProjectSchema);
Project.createIndexes();
module.exports = Project;
