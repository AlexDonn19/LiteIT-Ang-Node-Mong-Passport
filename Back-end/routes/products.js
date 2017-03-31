var Product = require('../models/product').Product;
var log = require('../libs/log')(module);

exports.get = function(req, res) {
    return Product.find(function (err, products) {
        if (!err) {
            return res.send(products);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
};
