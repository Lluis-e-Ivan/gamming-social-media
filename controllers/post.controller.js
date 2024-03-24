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
                text: req.body.text 
            };

            if(req.file) {
                patch.image = req.file.path;
            }

            post.owner = req.user.id;
            post.channel = id;
            
            if (req.file) {
                post.image = req.file.path;
            }

            return Post.create(post)
                .then(() =>{
                    console.log(req.file)
                    res.redirect(`/channels/${id}`)})
                .catch(next);
        };
    })
    .catch(next);
};