const mongoose = require('mongoose');
const billSchema = mongoose.Schema({
    userId:{type: String, required: true},
    creator:{type: String},
    title:{ type: String, required: true },
    text:{ type: String },
    imageUrl:{ type: String},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: Array},
    usersDisliked: {type: Array},
    creationTimeStamp: { type : Date, default: Date.now},
    modifiedTimeStamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Bill', billSchema);