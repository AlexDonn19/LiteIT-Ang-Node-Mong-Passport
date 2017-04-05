var User = require('../models/user').User;
var log = require('../libs/log')(module);
var passport = require('passport');

// token factory
var oauth2 = require('../libs/oauth2');
require('../libs/auth');

exports.post = function(req, res) {

    return User.findOne( {username: req.body.username}, function (err, user) {
        if (err) {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        };
        if (user) {
            if (user.checkPassword(req.body.password)) {
                passport.authenticate('bearer', { session: false });
                return res.send({ success: true, token: 1 });
            } else {
                res.statusCode = 422;
                return res.send({ error: 'Wrong password'});
            };
        } else {
            res.statusCode = 422;
            return res.send({ error: 'User unknown'});
        }
    });
};
