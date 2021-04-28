const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// where did we get smpt.gmail.com, from google documentation, google smtp google settings
// port 465 for SSL
//     and for TLS 587

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail@.com',
    port: 587,
    secure: false,
    auth: {
        user: 'bhavyatyagi4@gmail.com',
        pass: '96879687'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (error, template) {
            if (error) {
                console.log('ERROR in rendering template', error);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}