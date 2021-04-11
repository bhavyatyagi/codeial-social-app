const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function (req, res) {

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        // request is an AJAX request, type is xml http request, xhr 
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            })
        }
        req.flash('success', 'Post Published!');
        return res.redirect('back');
    } catch (error) {
        req.flash('error', 'Something went wrong');
        console.log('******Error********', error);
    }

}

module.exports.destroy = async function (request, response) {
    //          /posts/destroy/id/
    try {
        let post = await Post.findById(request.params.id);
        if (post.user == request.user.id) {
            post.remove();
            await Comment.deleteMany({
                post: request.params.id
            });

            if (request.xhr) {
                return response.status(200).json({
                    data: {
                        post_id: request.params.id
                    },
                    message: "Post deleted!"
                })
            }
            request.flash('success', 'Post and related comments deleted!');

            return response.redirect('back');

        } else {
            request.flash('error', 'Unauthorised: You cannot delete this post');
            return response.redirect('back');
        }
    } catch (error) {
        request.flash('error', error);

        console.log('******Error********', error);
    }
}