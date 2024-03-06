const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');

router.get('/',  (req, res, next) => res.render('misc/home'));
router.get('/signup', users.create);

module.exports = router;