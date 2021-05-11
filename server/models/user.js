const { date } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String
    },
    surName: {
        type: String
    },
    gender: {
        type: String
    },
    code: {
        type: String
    },
    email: {
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
    birthday: {
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
}, {timestamps: true})

module.exports = mongoose.model('users', UserSchema);