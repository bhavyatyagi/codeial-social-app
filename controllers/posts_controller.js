const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function (req, res) {
    console.log(Post);
    if (req.body.content == "") {
        console.log('Cant leave this empty');
        return;
    }
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) {
            console.log('Error in creating a post--->post_controller.js');
            return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy = function (request, response) {
    //          /posts/destroy/id/
    Post.findById(request.params.id, function (error, post) {
        // . id means converting object _id in string automatically by mongoose 
        if (post.user == request.user.id) {
            post.remove();
            Comment.deleteMany({ post: request.params.id }, function (error) {
                return response.redirect('back');
            });

        } else {
            return response.redirect('back');
        }
    });
}