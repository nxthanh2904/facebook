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
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    listfriends: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    active: {
        type: Boolean,
    },
    coverImage: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('users', UserSchema);