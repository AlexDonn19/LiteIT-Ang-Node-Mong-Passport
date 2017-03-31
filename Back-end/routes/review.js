var Review = require('../models/review').Review;
var log = require('../libs/log')(module);

exports.get = function(req, res) {
    return Review.find( {id_entry: req.params.id}, function (err, reviews) {
        if (!err) {
            return res.send(reviews);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.post = function(req, res) {
    var review = new Review({
        rate: req.body.rate,
        text: req.body.text,
        id_user: req.user._id,
        id_entry: req.params.id
    });

    review.save(function (err) {
        if (!err) {
            return res.send({ status: 'OK', review_id: review._id });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
};