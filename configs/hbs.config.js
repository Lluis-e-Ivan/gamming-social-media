const hbs = require('hbs');
const { options } = require('./routes.config');

hbs.registerPartials(`${__dirname}/../views/partials`);

/*
hbs.registerHelper('inSelection', function (arrayTypes, type) {
    return arrayTypes ? arrayTypes.includes(type) : false;
});
*/