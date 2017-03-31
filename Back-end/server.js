var express        = require('express');
var path           = require('path');
var favicon        = require('serve-favicon');
var log            = require('./libs/log')(module);
var logger         = require('morgan');
var config         = require('./config');
var methodOverride = require('method-override');
var bodyParser     = require('body-parser');
var passport       = require('passport');


var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (app.get('env') == 'development' ) {
  app.use(logger('dev'));
} else {
  app.use(logger('default'));
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride());
app.use(passport.initialize());


require('./routes')(app);
app.use(express.static(path.join(__dirname, "public")));


app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});


app.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});