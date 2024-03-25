const mongoose = require('mongoose');
const createError = require('http-errors');
const Channel = require('../models/channel.model');
const Game = require('../models/game.model');
const Post = require('../models/post.model');
const UserChannel = require('../models/user-channel.model');
const User = require('../models/user.model');
const { sessions } = require('../middlewares/auth.middleware');

module.exports.list = (req, res, next) => { 
    User.findById(req.user.id)
        .populate({
            path: 'yourChannels', 
            populate: {
                path: 'channel'
            }
        })
        .then((user) => {
            Channel.find()
            .then((channels) => {
                if(!channels) {
                    next(createError(404, 'Channel list not found'));
                } else {
                    return UserChannel.find({user: req.user.id})
                    .then(userchannels => {
                        const userChannelId = userchannels ? userchannels.map(channel => channel.channel.toString()) : [];
                        const finalChannels = channels.map(channel => {
                            channel.alreadyAdded = userChannelId.includes(channel._id.toString());
                            return channel;
                        })
                        res.render('channels/list', { channels: finalChannels, user });
                    })
                    .catch(next)
                }
            })
            .catch(next);
        })
        .catch(next)
}

module.exports.create = (req, res, next) => res.render('channels/create', { game: { _id: req.params.id }});

module.exports.doCreate = (req, res, next) => {
    const channel = { 
        name: req.body.name,
        description: req.body.description,
        private: req.body.private,
        game: req.params.id
    }
    
    if(req.file) {
        patch.image = req.file.path;
    }

    const game = req.params.id;

    Channel.create(channel)
        .then((channel) => {
            res.render(`channels/details`, { channel, game })
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render(`game/${req.params.id}`, { errors: error.errors });
            } else {
                console.error(error);
            }
        });
};

module.exports.details = (req, res, next) => {
    const { id } = req.params;
    const user = req.user.id;
    
    Channel.findById(id)
        .populate({
            path: 'yourPosts', 
            populate: {
                path: 'channel',
            },
        })
        .populate({
            path: 'yourPosts', 
            populate: {
                path: 'owner',
                select: 'image username'
            },
        })
        .populate({
            path: 'yourPosts',
            populate: {
                path: 'yourComments',
                model: 'Comment',
                populate: {
                    path: 'owner',
                    model: 'User'
                }
            }
        })
        .then((channel) => {
            if(!channel) {
                next(createError(404, 'Channel not found'));
            } else {
                return User.findById(user)
                .then((user) => {
                    return UserChannel.findOne({
                        user,
                        channel: channel.id
                    })
                    .then(userchannel => {
                        UserChannel.countDocuments({ channel })
                            .then((count) => {
                                res.render('channels/details', { channel, userchannel, user, count });
                            })
                            
                    });
                            
                       
                })
            }
        })
        .catch(next);
};

module.exports.addChannelList = (req, res, next) => {
    const { id } = req.params;
    const user = req.user.id;

    Channel.findById(id)
        .then((channel) => {
            if (!channel) {
                next(createError(404, 'Channel not found'));
            } else {
                return UserChannel.create({ channel, user })     
                    .then(() => res.redirect('/channels'))
                    .catch(next);
            }
        })
        .catch(next);
}

module.exports.deleteChannelList = (req, res, next) => {
    const { id } = req.params;
    const user = req.user.id;

    Channel.findById(id)
        .then((channel) => {
            if(!channel) {
                next(createError(404, 'Channel not found'));
            } else {
                return UserChannel.deleteOne({ channel, user })
                    .then(() => res.redirect('/channels'))
                    .catch(next);
            }   
        })
        .catch(next)
}