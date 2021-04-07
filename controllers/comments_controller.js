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

        response.redirect('/');
    } catch (error) {
        console.log('******Error********', error);
    }
}

module.exports.destroy = async function (req, res) {

    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            return res.redirect('back');

        }
        else {
            return res.redirect('back');

        }
    } catch (error) {
        console.log('******Error********', error);
    }
}