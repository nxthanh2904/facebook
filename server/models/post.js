const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator: {
        type: String,
        ref: "users"
    },
    described: {
        type: String,
    },
    media: {
        type: String,
    },
    modified:{
        type: String,
    },
    image: [{
        type: String,
    }],
    comment: [{
       creator: {
           type: String,
           ref: "users"
       },
       described: {
           type: String
       },
       createAt: {
           type: Date
       } 
    }],
    created: {
        type: Date
    },
    like: [{
        creator: {
            type: String,
            ref: "users"
        },
        createAt: {
            type: Date
        } 
     }],
    status: {
        type: String
    },
    banned: {
        type: String
    },
    // Khóa bình luận
    cancomment: {
        type: String
    },
    reported: [{
        createAt: {
            type: Date
        },
        creator: {
            type: String,
            ref: "users"
        },
        description: {
            type: String,
        }
    }]
})

module.exports = mongoose.model('posts', PostSchema);