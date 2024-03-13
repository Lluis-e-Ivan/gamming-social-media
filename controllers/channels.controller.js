const mongoose = require('mongoose');
const createError = require('http-errors');
const Channel = require('../models/channel.model');
const Game = require('../models/game.model');

module.exports.create = (req, res, next) => res.render('channels/create');

module.exports.doCreate = (req, res, next) => {
    const channel = { 
        name: req.body.name,
        description: req.body.description,
        image: req.file ? `/uploads/${req.file.filename}` : '',
        private: req.body.private
     }
    
     const game = req.params.id;
     console.log(game)

    Channel.create(channel)
        .then((channel) => {
            res.send('Canal creado', {game})
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('channels/create', { channel: req.body, errors: error.errors });
            } else {
                console.error(error);
            }
        });
};
  