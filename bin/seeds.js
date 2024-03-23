require('dotenv').config();
require('../configs/db.config.js');
const Game = require('../models/game.model');
const News = require('../models/news.model.js');

const axios = require('axios');

Game.deleteMany({})
    .then(() => {
        axios.get('https://www.mmobomb.com/api1/games')
            .then(response => {
                response.data.forEach((game, i) => {
                    setTimeout(() => {
                        axios.get(`https://www.mmobomb.com/api1/game?id=${game.id}`)    
                            .then(response => {
                                const game = response.data;
                                Game.create({   
                                    id: game.id, 
                                    title: game.title, 
                                    thumbnail: game.thumbnail, 
                                    status: game.status, 
                                    short_description: game.short_description, 
                                    game_url: game.game_url,
                                    genre: game.genre,
                                    description: game.description,
                                    platform: game.platform,
                                    publisher: game.publisher,
                                    developer: game.developer,
                                    release_date: game.release_date,
                                    profile_url: game.profile_url,
                                    minimum_system_requirements: game.minimum_system_requirements,
                                    screenshots: game.screenshots,
                                })
                                    .then(() => {
                                        console.log(`Juego creado: ${game.title}`);
                                    })
                            })
                    }, i * 1000)
                })
            })
    });

    News.deleteMany({})
    .then(() => {
        axios.get('https://www.mmobomb.com/api1/latestnews')
            .then(response => {
                const { data } = response;
                const news = data.map(news => ({
                    id: news.id, 
                    title: news.title, 
                    short_description: news.short_description,
                    thumbnail: news.thumbnail, 
                    main_image: news.main_image,
                    article_content: news.article_content,
                    article_url: news.article_url
                }));
                
                News.create(news)
                    .then(() => {
                        console.log(`Artículos creados`);
                    })
                })
            
    });