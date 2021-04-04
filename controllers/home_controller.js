// exporting function
let Post = require('../models/post');
const User = require('../models/user');
let array = [
    {
        name: "Bhavya"
    },
    {
        name: "Nipun"
    },
    {
        name: "Rupal"
    },
    {
        name: "Sony"
    }
]
module.exports.home = function (request, response) {


    // populating the user object to get the details from DB
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function (error, posts) {
            User.find({}, function (error, user) {
                return response.render('home', {
                    title: "Codeial | Home",
                    something: array,
                    posts: posts,
                    all_users: user
                });
            });
        });

}

// Syntax 
// module.exports.actionName=function(request,response){};