const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator: {
        type: String,
        ref: "users"
    },
    data: [{
        post: {
            type: String,
            ref: "posts"
        },
        type: {
            type: String
        },
        from: {
            type: String,
            ref: "users"
        },
        createAt: {
            type: Date
        }
    }]
})

module.exports = mongoose.model('notifications', PostSchema);