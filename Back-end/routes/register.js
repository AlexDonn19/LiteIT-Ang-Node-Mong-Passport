var User = require('../models/user');
var log = require('../libs/log')(module);

exports.post = function(req, res, next) {
    User.findOne( {username: req.body.username}, function (err, existUser) {
        if (err) {
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.status(500).send({ error: 'Server error' });
        };
        if (existUser) {
            return res.status(403).send({ error: 'This User allready exists'});
        };
        var user = new User({
            username: req.body.username,
            password: req.body.password
        });

        user.save(function (err) {
            if (err) {
                res.status(500).send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            };
            next();
            // return res.send({ success: true, token: 1 });
        });
    });
};
