const mongoose = require('mongoose');
const createError = require('http-errors');
const Comment = require('../models/comment.model');
const Post = require('../models/post.model');

module.exports.doCreate = (req, res, next) => {
    const postId = req.params.postId;
    
    Post.findById(postId)
    .then((post) => {
        if(!post) {
            next(createError(404, 'Post not found'));
        } else {
            const comment = req.body;
            comment.owner = req.user.id;
            comment.post = postId;
            comment.channel = post.channel;

            return Comment.create(comment)
                .then(() => res.redirect(`/channels/${post.channel}#${postId}`))
                .catch(next)
        };
    })
    .catch(next)
}

module.exports.doCreateHome = (req, res, next) => {
    const postId = req.params.postId;
    console.log(postId)

    Post.findById(postId)
    .then((post) => {
        if(!post) {
            next(createError(404, 'Post not found'));
        } else {
            const comment = req.body;
            comment.owner = req.user.id;
            comment.post = postId;
            comment.channel = post.channel;

            return Comment.create(comment)
                .then(() => res.redirect(`/home#${postId}`))
                .catch(next)
        };
    })
    .catch(next)
}