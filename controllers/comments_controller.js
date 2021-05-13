const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers//comment_email_worker');

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
            // now commented as implemented in workers / comments_email_worker.js
            // commentsMailer.newComment(comment);
            // instead we put 
            let job = queue.create('emails', comment).save(function (error) {
                if (error) {
                    console.log('Error', error);
                    return;
                }
                console.log('job enqueued', job.id);
            });
            if (request.xhr) {
                return response.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Created"
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
        if (comment.user == req.user.id || post.user.id == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, {
                $pull: {
                    comments: req.params.id
                }
            });
            await Like.deleteMany({ likeable: comment._id, onModel: 'Comment' });

            // send the comment id which was deleted back to the views 
            if (req.xhr) {
                return res.status(200).json(
                    {
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Comment Deleted"
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