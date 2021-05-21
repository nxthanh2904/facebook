const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    listuser: [{
        type: Schema.Types.ObjectId,
        ref: "users",
    }],
    message: [{
        creator: {
            type: Schema.Types.ObjectId,
            ref: "users",

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