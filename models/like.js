const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this define the object id of the like object 
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // This is due to polymorphic realtionship
    // this field is used for defining the type of likeable object since this is a dynamic refernce and not hard coded
    onModel: {
        type: String,
        required: true,
        // it tells that the value can only be these values
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;