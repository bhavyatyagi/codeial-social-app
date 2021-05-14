const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method 
// this will be used / called in comments controller
exports.newToken = (email, link) => {
    // already defined /views/mailers in nodemailer.js 
    let htmlString = nodeMailer.renderTemplate({ link: link }, '/tokens/new_token.ejs');

    nodeMailer.transporter.sendMail({
        from: 'noreply@codeial.com',
        to: email,
        subject: 'Important: Password Reset Request',
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

exports.newPassword = (email) => {
    // already defined /views/mailers in nodemailer.js 
    let htmlString = nodeMailer.renderTemplate({ email: email }, '/tokens/new_password.ejs');

    nodeMailer.transporter.sendMail({
        from: 'noreply@codeial.com',
        to: email,
        subject: 'Critical: Your Password has been changed',
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