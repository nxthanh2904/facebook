const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator: {
        type:  Schema.Types.ObjectId,
        ref: "users"
    },
    data: [{
        post: {
            type:  Schema.Types.ObjectId,
            ref: "posts"
        },
        type: {
            type: String
        },
        from: {
            type:  Schema.Types.ObjectId,
            ref: "users"
        },
        createAt: {
            type: Date
        }
    }]
})

module.exports = mongoose.model('notifications', PostSchema);