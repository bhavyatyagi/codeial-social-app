const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
// index is used for action name
module.exports.index = async function (request, response) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return response.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function (request, response) {
    //          /posts/destroy/id/
    try {
        let post = await Post.findById(request.params.id);
        // if (post.user == request.user.id) {
        post.remove();
        await Comment.deleteMany({
            post: request.params.id
        });

        return response.json(200, {
            message: "Post and associated comments deleted!"
        })
        // request.flash('success', 'Post and related comments deleted!');

        return response.redirect('back');

        // } else {
        //     request.flash('error', 'Unauthorised: You cannot delete this post');
        //     return response.redirect('back');
        // }
    } catch (error) {
        console.log('********ERROR******', error);
        response.json(500, {
            message: "Interval Server Error"
        });
    }
}