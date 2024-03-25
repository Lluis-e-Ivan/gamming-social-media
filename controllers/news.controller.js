const mongoose = require('mongoose');
const createError = require('http-errors');
const News = require('../models/news.model');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {

    News.find()
        .then((news) => {
            if(!news) {
                next(createError(404, 'News list not found'));
            } else {
                return User.findById(req.user.id)
                    .then((user) => {
                        console.log(news)
                        res.render('news/list', { news, user });
                    })
            }
        })
        .catch(next);
}

module.exports.details = (req, res, next) => {

    const { id } = req.params;

    News.findById(id)
        .then((news) => {
            if(!news) {
                next(createError(404, 'Game not found'));
            } else {
                return User.findById(req.user.id)
                    .then((user) => {
                        res.render('news/details', { news, user });
                    })
            }
        })
        .catch(next);
}