// exporting function
let Post = require('../models/post');
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

    Post.find({}).populate('user').exec(function (error, posts) {
        return response.render('home', {
            title: "Codeial | Home",
            something: array,
            posts: posts
        });
    });

}

// Syntax 
// module.exports.actionName=function(request,response){};