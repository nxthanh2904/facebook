const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestFriendSchema = new Schema({
    from : {
        type: String,
        ref: "users"
    },
    to: {
        type: String,
        ref: "users"
    },
    createAt: {
        type: Date,
    },
    status: {
        type: String,
    }
})

module.exports = mongoose.model('requestfriend', RequestFriendSchema);