const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Channel = require('./channel.model');

const gameSchema = new Schema(
    {
        id: {
            type: Number
        },
        title: {
            type: String
        },
        thumbnail: {
            type: String
        },
        status: {
            type: String
        },
        short_description: {
            type: String
        },
        description: {
            type: String
        },
        game_url: {
            type: String
        },
        genre: {
            type: String
        },
        platform: {
            type: String
        },
        publisher: {
            type: String    
        },
        developer: {
            type: String        
        },
        release_date: {
            type: String
        },
        profile_url: {
            type: String
        },
        minimum_system_requirements: {
            type: Object
        },
        screenshots: {
            type: [Object]
        },
    },
    { timestamps: true }
);

gameSchema.virtual('yourChannels', {
    ref: 'Channel', // Modelo
    localField: '_id', // Mi campo que tiene la N
    foreignField: 'game', // El nombre del campo del modelo "Channel"
})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;