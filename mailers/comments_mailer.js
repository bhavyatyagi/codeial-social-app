const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method 
// this will be used / called in comments controller
exports.newComment = (comment) => {
    // already defined /views/mailers in nodemailer.js 
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');



    nodeMailer.transporter.sendMail({
        from: 'noreply@codeial.com',
        to: comment.user.email,
        subject: 'Your post has new Comments',
        html: htmlString
        // html: '<h1>Your comment is published</h1>'

    }, (error, info) => {
        if (error) {
            console.log('ERROR IN SENDING MAIL', error);
            return;
        }
        console.log('Message Sent', info);
        return;

    });
}