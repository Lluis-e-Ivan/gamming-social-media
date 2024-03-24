const mongoose = require('mongoose');
const createError = require('http-errors');
const Channel = require('../models/channel.model');
const Game = require('../models/game.model');
const Post = require('../models/post.model');
const UserChannel = require('../models/user-channel.model');

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
                res.status(400).render('channels/create', { channel, errors: error.errors });
            } else {
                console.error(error);
            }
        });
};

module.exports.details = (req, res, next) => {
    const { id } = req.params;
    
    Channel.findById(id)
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
                return UserChannel.findOne({
                    user: req.user.id,
                    channel: channel.id
                })
                    .then(userchannel => {
                        res.render('channels/details', { channel, userchannel });
                    })
            }
        })
        .catch(next);
};

  