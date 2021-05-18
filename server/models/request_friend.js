const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestFriendSchema = new Schema({
    from : {
        type:  Schema.Types.ObjectId,
        ref: "users"
    },
    to: {
        type:  Schema.Types.ObjectId,
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