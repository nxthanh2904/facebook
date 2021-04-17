const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    listuser: [{
        type: String,
        ref: "users",
    }],
    message: [{
        creator: {
            type: String,
            ref: "users"
        },
        content: {
            type: String
        },
        createAt: {
            type: Date
        }
    }],
})

module.exports = mongoose.model('chats', ChatSchema);