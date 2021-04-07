const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function (req, res) {

    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (error) {
        console.log('******Error********', error);
    }

}

module.exports.destroy = async function (request, response) {
    //          /posts/destroy/id/
    try {
        let post = await Post.findById(request.params.id);
        if (post.user == request.user.id) {
            post.remove();
            await Comment.deleteMany({ post: request.params.id });
            return response.redirect('back');

        }
        else {
            return response.redirect('back');
        }
    } catch (error) {
        console.log('******Error********', error);
    }
}