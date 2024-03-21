const mongoose = require('mongoose');
const createError = require('http-errors');
const Post = require('../models/post.model');
const Channel = require('../models/channel.model');

module.exports.doCreate = (req, res, next) => {
    const { id } = req.params;

    Channel.findById(id)
    .then((channel) => {
        if (!channel) {
            next(createError(404, 'Channel not found'));
        } else {
            const post = {
                image: req.file ? `/uploads/posts/${req.file.filename}` : '',
                text: req.body.text 
            };
            post.owner = req.user.id;
            post.channel = id;

            return Post.create(post)
                .then(() =>res.redirect(`/channels/${id}`))
                .catch(next);
        };
    })
    .catch(next);
};