const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function (request, response) {
    try {
        let post = await Post.findById(request.body.post);
        if (post) {
            let comment = await Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            });
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(comment);
            if (request.xhr) {
                return response.status(200).joson({
                    data: {
                        comment: comment
                    },
                    message: "Post Created"
                });
            }

            request.flash('success', 'Comment added');
            response.redirect('/');
        }


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


            if (req.xhr) {
                return res.status(200).json(
                    {
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post Deleted"
                    });
            }
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