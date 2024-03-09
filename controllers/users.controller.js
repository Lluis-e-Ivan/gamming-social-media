const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { sessions } = require('../middlewares/auth.middleware');
const createError = require('http-errors');

module.exports.create = (req, res, next) => res.render('users/signup');

module.exports.doCreate = (req, res, next) => {

    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                res.status(409).render('users/signup', { user: req.body, errors: { username: 'Already exists'} });
            } else {
                const user = { 
                    name: req.body.name, 
                    lastName: req.body.lastName, 
                    username: req.body.username, 
                    email: req.body.email, 
                    password: req.body.password,
                    image: req.file ? `/uploads/${req.file.filename}` : '',
                    phone: req.body.phone,
                    birthDate: req.body.birthDate
                };
                return User.create(user)
                    .then(() => res.redirect('/login'));
            };
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('users/signup', { user: req.body, errors: error.errors });
            } else {
                console.error(error);
            }
        });
};

module.exports.login = (req, res, next) => res.render('users/login');

module.exports.doLogin = (req, res, next) => {
    User.findOne({ username: req.body.username})
        .then((user) => {
            if (!user) {
                res.status(401).render('users/login', { user: req.body, errors: { password: 'Invalid username or password'}})
            } else {
                return user.checkPassword(req.body.password)
                    .then((match) => {
                        if(match) {
                            req.session.userId = user.id;
                            res.redirect('/profile');
                        } else {
                            res.status(401).render('users/login', { user: req.body, errors: { password: 'Invalid username or password'}})  
                        }
                    })
            }
        })
        .catch(next);
};

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    req.session = null;
    res.clearCookie('connect.sid');
    res.redirect('/login');
};

module.exports.profile = (req, res, next) => res.render('users/profile');

module.exports.edit = (req, res, next) => res.render('users/edit');

module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;
    const patch = { 
        name: req.body.name, 
        lastName: req.body.lastName, 
        username: req.body.username, 
        email: req.body.email, 
        image: req.body.image,
        phone: req.body.phone,
        birthDate: req.body.birthDate
    }

    if (req.body.password) {
        patch.password = req.body.password;
    }

    User.findById(id)
        .then(user => {
            if (!user) {
                next(createError(404, 'User not found'));
            } else {
                Object.assign(user, patch)
                return user.save()
            }
        })
        .then((user) => {
            res.redirect('/profile');
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('users/edit', { user: req.body, errors: error.errors});
            } else {
                next(error);
            }
        });
};

module.exports.doDelete = (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndDelete(id)
        .then(() => res.redirect('/login'))
        .catch(next)
}
