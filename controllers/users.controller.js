const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
    res.render('users/signup');
}

module.exports.doCreate = (req, res, next) => {
    
}