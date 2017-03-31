var oauth2orize         = require('oauth2orize');
var passport            = require('passport');
var crypto              = require('crypto');
var config              = require('../config');

var User           = require('../models/user');
var AccessToken    = require('../models/accessToken');
var RefreshToken   = require('../models/refreshToken');

var log = require('../libs/log')(module);

var aserver = oauth2orize.createServer();

var errFn = function (cb, err) {
    if (err) {
        return cb(err);
    };
};

var generateTokens = function (data, done) {

    var errorHandler = errFn.bind(undefined, done),
        refreshToken,
        refreshTokenValue,
        token,
        tokenValue;

    RefreshToken.remove( {userId: data.userId}, errorHandler);
    AccessToken.remove( {userId: data.userId}, errorHandler);

    tokenValue = crypto.randomBytes(32).toString('hex');
    refreshTokenValue = crypto.randomBytes(32).toString('hex');

    data.token = tokenValue;
    token = new AccessToken(data);

    data.token = refreshTokenValue;
    refreshToken = new RefreshToken(data);

    refreshToken.save(errorHandler);
    token.save(function (err) {
        if (err) {
            log.error(err);
            return done(err);
        };
        done(null, tokenValue, refreshTokenValue, {
            'expires_in': config.get('security:tokenLife'),
            'success': true
        });
    });
};

aserver.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
    console.log('**//** oauth2.js: exchange.password starts, client', client);
    User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); };
        if (!user || !user.checkPassword(password)) { return done(null, false); };
        var model = {
            userId: user.userId,
            clientId: client._id
        };
        generateTokens(model, done);
    });
}));

aserver.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    console.log('**//** oauth2.js: exchange.refreshToken starts');
    RefreshToken.findOne({ token: refreshToken, clientId: client.clientId }, function(err, token) {
        if (err) { return done(err); };
        if (!token) { return done(null, false); };

        User.findById(token.userId, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            var model = {
                userId: user.userId,
                clientId: client._id
            };
            generateTokens(model, done);
        });
    });
}));


exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    aserver.token(),
    aserver.errorHandler()
];
