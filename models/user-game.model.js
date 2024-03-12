const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');
const Game = require('./game.model');

const userGameSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        game: {
            type: mongoose.Types.ObjectId,
            ref: 'Game'
        }
    }
);

const UserGame = mongoose.model('UserGame', userGameSchema);
module.exports = UserGame;