const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sent this request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // to the user wjo accepted this request, the naming is just to understand only
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;

// Things to do 
// 1. Show user's friends on the home page with remove button
// 2. show all other users below it with add button
// 3. Schemas are ready (friendship.js)