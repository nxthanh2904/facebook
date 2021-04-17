const { date } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String
    },
    code: {
        type: String
    }, 
    phoneNumber: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    username: {
        type: String,
    },
    avatar: {
        type: String,
        default: "/upload/avatars/user.jpg"
    },
    token: [{
        type: String
    }],
    birth: {
        type: Date
    },
    block: [{
        type: String,
        ref: "users"
    }],
    listfriends: [{
        type: String,
        ref: "users"
    }],
    active: {
        type: Boolean,
    }
})

module.exports = mongoose.model('users', UserSchema);