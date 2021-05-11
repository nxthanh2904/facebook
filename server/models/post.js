const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator: {
        type: String,
        ref: "users"
    },
    content: {
        type: String,
    },

    feeling: {
        type: String,
    },

    activity: {
        type: String,
    },
    images: [{
        type: String,
    }],
    videos: [{
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
        },
        images: [{
            type: String,
        }],
        videos: [{
            type: String,
        }],
    }],

    reactions: [{
        userId: {
            type: String,
            ref: "users"
        },
        type: {
            type: Number, //1: like 2: love 3: wow 4: sad 5:angry
        },
        createAt: {
            type: Date
        }
    }],
    group: {
        type: String,
        ref: "group"
    },
    usersHidePost: [{
        type: String,
        ref: "users"
    }],


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
}, { timestamps: true })

module.exports = mongoose.model('posts', PostSchema);