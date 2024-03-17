const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Game = require('./game.model');
const Post = require('./post.model');

const channelSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Channel name is required'],
            minLength: [2, 'Channel name needs at least 2 chars'],
            unique: true
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        publications: {
            type: String
        },
        private: {
            type: Boolean,
            default: false
        },
        game: {
            type: mongoose.Types.ObjectId,
            ref: 'Game'
        }
    },
    { timestamps: true }
);

channelSchema.virtual('yourPosts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'channel'
});

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;