const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const secure = require('../middlewares/auth.middleware');

router.get('/',  (req, res, next) => res.render('misc/home'));
router.get('/signup', users.create);
router.post('/signup', users.doCreate);
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.post('/logout', users.logout);
router.get('/profile', secure.isAuthenticated, users.profile);
router.get('/edit/:id', secure.isAuthenticated, users.edit);
router.post('/edit/:id', secure.isAuthenticated, users.doEdit);


module.exports = router;