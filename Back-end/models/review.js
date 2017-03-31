var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    rate:     { type: Number, required: true, min: 0, max: 5 },
    text:     { type: String, required: true },
    id_user:  { type: String, required: true },
    id_entry: { type: String, required: true }
});

exports.Review = mongoose.model('Review', reviewSchema);