const queue = require('../config/kue');
// all the comment mails has to go into the queue 
const commentMailer = require('../mailers/comments_mailer');

queue.process('emails', function (job, done) {
    console.log('emails worker is processing a job', job.data);
    commentMailer.newComment(job.data);
});