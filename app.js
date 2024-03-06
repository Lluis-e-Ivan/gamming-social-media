require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');

const authMiddleware = require('./middlewares/auth.middleware');

// Init configurations
require('./configs/hbs.config');
require('./configs/db.config');

const app = express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

// Application middlewares
app.use(express.urlencoded());
app.use(logger('dev'));

// Session middlewares
const { session, loadUserSession } = require('./configs/sessions.config');
app.use(session);
app.use(loadUserSession);

// Routes
const routes = require('./configs/routes.config');
app.use('/', routes);

const port = 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));