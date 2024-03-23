const Game = require('../models/game.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
const Channel = require('../models/channel.model');
const UserGame = require('../models/user-game.model');

module.exports.list = (req, res, next) => {
    
    User.findById(req.user.id)
        .populate({
            path: 'yourGames', 
            populate: {
                path: 'game'
            }
        })
        .then((user) => {
            Game.find()
            .then((games) => {
                if(!games) {
                    next(createError(404, 'Games list not found'));
                } else {
                    return UserGame.find({user: req.user.id})
                    .then(usergames => {
                        const userGameId = usergames ? usergames.map(game => game.game.toString()) : [];
                        const finalGames = games.map(game => {
                            game.alreadyAdded = userGameId.includes(game._id.toString());
                            return game;
                        })
                        res.render('games/list', { games: finalGames, user });
                    })
                    .catch(next)
                }
            })
            .catch(next);
        })
        .catch(next)
};

module.exports.details = (req, res, next) => {
    const { id } = req.params;

    Game.findById(id)
        .populate({
            path: 'yourChannels', 
        })
        .then((game) => {
            if(!game) {
                next(createError(404, 'Game not found'));
            } else {
                return UserGame.findOne({
                    user: req.user.id,
                    game: game._id
                })
                    .then(usergame => {
                        res.render('games/details', { game, usergame });
                    })
            }
        })
        .catch(next);
};

module.exports.addGameList = (req, res, next) => {
    const { id } = req.params;
    const user = req.user.id;

    Game.findById(id)
        .then((game) => {
            if (!game) {
                next(createError(404, 'Game not found'));
            } else {
                return UserGame.create({ game, user })     
                    .then(() => res.redirect('/games'))
                    .catch(next);

            }
        })
        .catch(next);
};

module.exports.deleteGameList = (req, res, next) => {
    const { id } = req.params;
    const user = req.user.id;

    Game.findById(id)
        .then((game) => {
            if(!game) {
                next(createError(404, 'Game not found'));
            } else {
                return UserGame.deleteOne({ game, user })
                    .then(() => res.redirect('/games'))
                    .catch(next);
            }   
        })
        .catch(next)
}