const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// static function 
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;


const User = mongoose.model('User', userSchema);

module.exports = User;

//// File Upload
// 1. install multer add enctype in form and add constants in model > js
// 2. require apth and const avatar_path and join the uplaods and the avatar folder
// 3. Add avatars into user schema and link avatar_pth and avatar field of user schema
// 4. Join our path to multer storage(where we want to save) , the syntax is avail in doc
// 5. Next, we've to use this storgae
// 6. We created static functions in the same js file
// 7. We made the request ajax in controller and there we accesed the static module to get req.file\

//// Show uplaoded file on page
// 1. add < img > in ejs file wiht appropriate details
// 2. Add app.use for the path in index.js main file

//// Edge CAse