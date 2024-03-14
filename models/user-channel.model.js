const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Channel = require('./channel.model');
const User = require('./user.model');

const userChannelSchema = new Schema (
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        channel: {
            type: mongoose.Types.ObjectId,
            ref: 'Channel'
        }
    }
)

const UserChannel = mongoose.model('UserChannel', userChannelSchema);
module.exports = UserChannel;