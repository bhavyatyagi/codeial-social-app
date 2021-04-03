const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (request, response) {
    Post.findById(request.body.post, function (error, post) {
        if (post) {
            Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            }, function (error, comment) {
                if (error) {
                    console.log('Error in creating a comment--> comments_controller.js');
                    return;
                }

                post.comments.push(comment);
                post.save();

                response.redirect('/');
            });

        }
    });
}