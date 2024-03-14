const Game = require('../models/game.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
const Channel = require('../models/channel.model');

module.exports.list = (req, res, next) => {
    
    Game.find()
        .then((games) => {
            if(!games) {
                next(createError(404, 'Games list not found'));
            } else {
                res.render('games/list', { games });
            }
        })
        .catch(next);
};

module.exports.details = (req, res, next) => {
    const { id } = req.params;

    Game.findById(id)
        .populate({
            path: 'yourChannels', 
            populate: {
                path: 'game'
            }
        })
        .then((game) => {
            if(!game) {
                next(createError(404, 'Game not found'));
            } else {
                res.render('games/details', { game });
            }
        })
        .catch(next);
};