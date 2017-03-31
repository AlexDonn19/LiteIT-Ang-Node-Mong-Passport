var Review = require('../models/review').Review;
var log = require('../libs/log')(module);

exports.get = function(req, res) {
    return Review.find(function (err, reviews) {
        if (!err) {
            return res.send(reviews);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
};