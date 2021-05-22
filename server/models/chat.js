const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    listuser: [{
        type: Schema.Types.ObjectId,
        // ref: "users",
    }],
    message: [{
       
        content: {
            type: String
        },
        createAt: {
            type: Date
        }
    }],
})

module.exports = mongoose.model('chats', ChatSchema);