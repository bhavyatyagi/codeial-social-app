const Post = require('../models/post');
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