// exporting function
let Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (request, response) {


    try {
        // populating the user object to get the details from DB
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        // .exec(function (error, posts) {
        // taken users part outside to make it async
        // });

        let users = await User.find({}); //dont need the callback part as well function(err,user)
        return response.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch (error) {
        // if any error occurs in any part this will handle it easily
        console.log('******Error********', error);
        return;
    }

}

// Syntax 
// module.exports.actionName=function(request,response){};

// more methods instead of async await, but async await is preferred

    // using then
    // Post.find({}).populate('comments').then(function ());

    // promises
    // let posts = Post.find({}).populate('comments').exec();
    // posts.then();

// but check async await 
// async await tells the server that this contains some
// async statement, u need to wait for the statements marked async 
// and hence wait there for its execution
// and then go to further statements
// and for error handling use try catch and do it only once for all 