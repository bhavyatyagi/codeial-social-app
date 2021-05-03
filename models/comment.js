const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:
    {
        type: String,
        required: true
    },
    // comment belongs to a user 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // it will also be related or commented on some post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    // this is added later so that our posts have the like count for each one 
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;