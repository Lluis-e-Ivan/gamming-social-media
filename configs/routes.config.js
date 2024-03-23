const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const games = require('../controllers/games.controller');
const channels = require('../controllers/channels.controller');
const posts = require('../controllers/post.controller');
const comments = require('../controllers/comments.controller');
const news = require('../controllers/news.controller');

const secure = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/'});

// Home
router.get('/home', secure.isAuthenticated, users.feed);
router.get('/', (req, res, next) => res.redirect('/home'));

// User Routes
router.get('/signup', users.create);
router.post('/signup', upload.single('image'), users.doCreate);

router.get('/signup-games', users.fillGames);
router.get('/signup-channels', users.fillChannels);

router.get('/login', users.login);
router.post('/login', users.doLogin);

router.post('/logout', users.logout);  

router.get('/profile', secure.isAuthenticated, users.profile);

router.get('/edit/:id', secure.isAuthenticated, users.edit);
router.post('/edit/:id', secure.isAuthenticated, users.doEdit);

router.post('/delete/:id', secure.isAuthenticated, users.doDelete);

// Game Routes
router.get('/games', secure.isAuthenticated, games.list);
router.get('/games/:id', secure.isAuthenticated, games.details);  
router.post('/games/:id/deleteGameList', secure.isAuthenticated, games.deleteGameList);
router.post('/games/:id/addGameList', secure.isAuthenticated, games.addGameList);

// Channel Routes
router.get('/games/:id/create-channel', secure.isAuthenticated, channels.create);
router.post('/games/:id/create-channel', secure.isAuthenticated, upload.single('image'), channels.doCreate);
router.get('/channels/:id', secure.isAuthenticated, channels.details);

// Relations Routes
router.post('/games/:id/delete', secure.isAuthenticated, users.deleteGame);
router.post('/games/:id/addGameForm', users.addGameForm);
router.post('/games/:id/deleteGameForm', users.deleteGameForm);
router.post('/games/:id', secure.isAuthenticated, users.addGame);
router.post('/channels/:id/delete', secure.isAuthenticated, users.deleteChannel);
router.post('/channels/:id', secure.isAuthenticated, users.addChannel);
router.post('/channels/:id/addChannelForm', secure.isAuthenticated, users.addChannelForm);
router.post('/channels/:id/deleteChannelForm', secure.isAuthenticated, users.deleteChannelForm);

// Post Routes
router.post('/channels/:id/post', secure.isAuthenticated, upload.single('image'), posts.doCreate);

// Comment Routes
router.post('/posts/:postId/comments', secure.isAuthenticated, comments.doCreate);

// News Routes
router.get('/news', news.list);

module.exports = router;