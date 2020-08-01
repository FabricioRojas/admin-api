var mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    }
})

const User = mongoose.model('User', UserSchema);
User.createIndexes();
module.exports = User;
