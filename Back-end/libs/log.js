console.log('libs/log.js added');

var winston = require ('winston');
if (winston) {console.log('winston added');}
var ENV = process.env.NODE_ENV;
console.log('NODE_ENV=',ENV);

function getLogger(module) {
    var path = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: (ENV == 'development') ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;
