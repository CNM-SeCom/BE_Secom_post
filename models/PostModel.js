const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    content: {
        text: String,
        images: [String],
        videos: String
    },
    likes: [{
        userId: String,  
    }],
    comments: [{
        comment: String,
        user: String
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    idUser : String,
    userCreated: String
});

module.exports = mongoose.model('Post', PostSchema);
