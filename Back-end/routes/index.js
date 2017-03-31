var cors = require('cors');
var oauth2 = require('../libs/oauth2');
var passport = require('passport');


module.exports = function (app) {

    // разрешить кросс-доменные запросы
    app.options('*', cors());

    // дать подсказку как использовать api
	app.get('/', require('./frontpage').get);
    // найти все продукты
    app.get('/api/products', cors(), require('./products').get);

    // найти все отзывы
    app.get('/api/reviews', cors(), require('./reviews').get);

    // найти все отзывы по конкретному product
    app.get('/api/reviews/:id', cors(), require('./review').get);

    // сохранить новый отзыв
    app.post('/api/reviews/:id', cors(), passport.authenticate('bearer', { session: false }), require('./review').post);

    // создать новый account
    app.post('/api/register', cors(), require('./register').post, oauth2.token);

    // войти в действующий account
    app.post('/api/login', cors(), oauth2.token, require('./login').post);
};



