var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    title: { type: String, unique: true,  required: true },
    image: { type: String, required: true },
    text:  { type: String, required: true }
});

exports.Product = mongoose.model('Product', productSchema);