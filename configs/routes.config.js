const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const games = require('../controllers/games.controller');
const channels = require('../controllers/channels.controller');

const secure = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/'});

router.get('/',  (req, res, next) => res.render('misc/home'));

// User Routes
router.get('/signup', users.create);
router.post('/signup', upload.single('image'), users.doCreate);

router.get('/login', users.login);
router.post('/login', users.doLogin);

router.post('/logout', users.logout);  

router.get('/profile', secure.isAuthenticated, users.profile);

router.get('/edit/:id', secure.isAuthenticated, users.edit);
router.post('/edit/:id', secure.isAuthenticated, users.doEdit);

router.post('/delete/:id', secure.isAuthenticated, users.doDelete);

// Game Routes
router.get('/games', secure.isAuthenticated, games.list);
router.get('/game/:id', secure.isAuthenticated, games.details);  

// Channel Routes
router.get('/game/:id/create-channel', secure.isAuthenticated, channels.create);
router.post('/game/:id/create-channel', secure.isAuthenticated, upload.single('image'), channels.doCreate);
router.get('/channel/:id', secure.isAuthenticated, channels.details);

// Relations Routes
router.post('/game/:id', secure.isAuthenticated, users.addGame);

module.exports = router;