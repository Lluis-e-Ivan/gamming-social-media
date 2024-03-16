const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./post.model');
const User = require('./user.model')

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: [true, 'Comment content is required']
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: 'Post'
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        channel: {
            type: mongoose.Types.ObjectId,
            ref: 'Channel'
        }
    }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;