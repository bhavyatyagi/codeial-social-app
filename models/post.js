const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the array of ids of all comments in the post schema itself
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    // this is added later so that our posts have the like count for each one 
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]
}, {
    timestamps: true
});


const Post = mongoose.model('Post', postSchema);
module.exports = Post;