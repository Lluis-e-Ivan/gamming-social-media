const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gamerhub';

mongoose.connect(MONGO_URI)
    .then(() => console.info(`Successfully connected to the database ${MONGO_URI}`))
    .catch((error) => console.error(`An error ocurred trying to connect to the database ${MONGO_URI}`, error));