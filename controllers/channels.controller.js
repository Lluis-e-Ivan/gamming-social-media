const mongoose = require('mongoose');
const createError = require('http-errors');
const Channel = require('../models/channel.model');
const Game = require('../models/game.model');

module.exports.create = (req, res, next) => res.render('channels/create', { game: { _id: req.params.id }});

module.exports.doCreate = (req, res, next) => {
    const channel = { 
        name: req.body.name,
        description: req.body.description,
        image: req.file ? `/uploads/${req.file.filename}` : '',
        private: req.body.private,
        game: req.params.id
    }
    
    const game = req.params.id;

    Channel.create(channel)
        .then((channel) => {
            res.redirect('/game/:id/:channel', { channel, game})
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('channels/create', { channel: req.body, errors: error.errors });
            } else {
                console.error(error);
            }
        });
};

module.exports.details = (req, res, next) => {
    const { id } = req.params;

    Channel.findById(id)
        .then((channel) => {
            if(!channel) {
                next(createError(404, 'Channel not found'));
            } else {
                res.render('channels/details', { channel });
            }
        })
        .catch(next);
};

  