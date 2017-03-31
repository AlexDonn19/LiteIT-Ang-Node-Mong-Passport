var mongoose = require('./libs/mongoose');
mongoose.set('debug', true);
var async = require('async');

async.series([
	open,
	dropProductsDВ,
    dropReviewsDВ,
    // dropUsersDВ,
	requireModels,
	createProducts
], function (err, results) {
	mongoose.disconnect();
    process.stderr.write('', function () {
        process.exit(err ? 255 : 0);
    });
});

function open(callback) {
  mongoose.connection.on('open', callback);
};

function dropProductsDВ(callback) {
  var db = mongoose.connection.db,
      collection = db.collection('products');
  collection.remove({}, callback);
};
function dropReviewsDВ(callback) {
  var db = mongoose.connection.db,
      collection = db.collection('reviews');
  collection.remove({}, callback);
};
// function dropUsersDВ(callback) {
//   var db = mongoose.connection.db,
//       collection = db.collection('users');
//   collection.remove({}, callback);
// };

function requireModels(callback) {
  require('./models/product');
  async.each(Object.keys(mongoose.models), function (modelName, callback) {
  	mongoose.models[modelName].ensureIndexes(callback);
  }, callback);
};

function createProducts(callback) {
  var products = [
  	{title: 'Book', image: './img/products/book.jpg', text: 'The best Angularjs books for you to learn and become expert at AngualrJS programming'},
  	{title: 'Pen', image: './img/products/pen.jpg', text: 'Ballpoint pen with twist mechanism. Barrel and cap made of black precious resin inlaid with Montblanc emblem. Gold-plated clip and rings.'},
  	{title: 'Table', image: './img/products/table.jpg', text: 'Modern table with a unique and unmistakable design for the kitchen, the living room and public spaces.'},
    {title: 'Chair', image: './img/products/chair.jpg', text: 'The convenient office chair from CorLiving featuring a black fabric seat, contoured white mesh back support, gas lift and black legs with rolling wheels.'}
  ];

  async.each(products, function (productData, callback) {
  	var product = new mongoose.models.Product(productData);
  	product.save(callback);
  }, callback);
};








