var mongoose = require('../libs/mongoose');

var User = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});



User.methods.checkPassword = function(userPassword) {
    if (!userPassword) return false;
    return userPassword === this.password;
};
// 2017-03-30 *************
User.methods.verifyPassword = function(password, cb) {
    console.log('**//** user.js: verifyPassword start');
    // if (!password || !this.password) return cb({error: 'password error'});
    var isMatch = (password === this.password) ? true : false;
    cb(null, isMatch);
};
//  *************

User.virtual('userId').get(function () {
    return this.id;
});
User.virtual('vpassword')
    .set(function(password) {
        this._plainPassword = password;
         this.hashedPassword = password;
    })
    .get(function() { return this._plainPassword; });



User.statics.authenticate = function (username, password, next) {
  this.findOne({ username: username }, function (err, user) {
    if (err) {
      return next(500, 'Internal service error');
    };

    if (!user || !user.checkPassword(password)) {
     return next(403, 'Username or password invalid');
    };

    return next(null, user);
  });
};

module.exports = mongoose.model('User', User);



