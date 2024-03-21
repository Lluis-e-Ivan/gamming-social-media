const mongoose = require('mongoose');
const createError = require('http-errors');
const News = require('../models/news.model');

module.exports.list = (req, res, next) => {

    News.find()
        .then((news) => {
            if(!news) {
                next(createError(404, 'News list not found'));
            } else {
                console.log(news)
                res.render('news/list', { news });
            }
        })
        .catch(next);
}