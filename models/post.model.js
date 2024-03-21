const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');
const Channel = require('./channel.model');

const postSchema = new Schema (
    {
        text: {
            type: String,
            required: [true, 'Post content is required'],
            minLength: 4
        },
        image: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User' 
        },
        channel: {
            type: mongoose.Types.ObjectId,
            ref: 'Channel'
        }
    },
    { timestamps: true }
);

postSchema.virtual('yourComments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;