var mongoose = require('mongoose');

const RoleSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: [{
        type: Number,
        required: true
    }]
})

const Role = mongoose.model('Role', RoleSchema);
Role.createIndexes();
module.exports = Role;
