const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (request, response) {
    try {
        let post = await Post.findById(request.body.post);
        let comment = await Comment.create({
            content: request.body.content,
            post: request.body.post,
            user: request.user._id
        });

        post.comments.push(comment);
        post.save();
        request.flash('success', 'Comment added');
        response.redirect('/');
    } catch (error) {
        request.flash('error', 'Something went Wrong');

        console.log('******Error********', error);
    }
}

module.exports.destroy = async function (req, res) {

    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, {
                $pull: {
                    comments: req.params.id
                }
            });
            req.flash('success', 'Comment deleted!');

            return res.redirect('back');

        } else {
            req.flash('error', 'Unauthorised: You can\'t delete this');

            return res.redirect('back');

        }
    } catch (error) {
        req.flash('error', 'Something went Wrong');

        console.log('******Error********', error);
    }
}