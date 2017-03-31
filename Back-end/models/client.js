var mongoose = require('mongoose');

var Client = new mongoose.Schema({
    name:         { type: String, unique: true, required: true },
    clientId:     { type: String, unique: true, required: true },
    clientSecret: { type: String, required: true }
});

exports.Client = mongoose.model('Client', Client);