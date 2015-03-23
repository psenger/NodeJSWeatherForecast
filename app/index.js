(function () {
    'use strict';
    var path = require('path'),
        fs = require('fs'),
        _ = require('lodash-node'),
        restify = require('restify'),
        conf = require('./util/conf'),
        logger = require('./util/logger'),
        geodata = require('../app/data/geodata'),
        stdSerializers = require('bunyan').stdSerializers,
        log = require('bunyan').createLogger({
            src: true,  // @todo: extract the src:true to a configuration, and turn it off in production
            name: "app",
            streams: [
                {
                    level: 'info',
                    stream: process.stdout // log INFO and above to stdout
                }, {
                    level: 'error',
                    path: path.join(__dirname, '../log', 'app-error.log')  // log ERROR and above to a file
                },
                {
                    level: 'debug',
                    path: path.join(__dirname, '../log', 'app-debug.log')  // log ERROR and above to a file
                }
            ]
        });

    // Attaching a locals.conf object to the restify Object. The conf
    // object will contain the server's run time properties (as defined
    // by the conf object and environment variables) making it available
    // to all the subsequent routes
    restify.locals = {};
    restify.locals.conf = require(path.join(__dirname, 'util', 'conf'));

    // set up server
    var options = {
        name: 'NewsCorpWeatherForecastService', // http header 'Server:'
        acceptable: ['application/json', 'text/html'], // produces json and html.
        version: restify.locals.conf.get("version"), // injects the http header 'Api-Version:'
        log: log, // inject the bunyan logger.
        formatters: {
            'text/html': function (req, res, body, cb) {
                if (body instanceof Error)
                    return body.stack;
                var s = "<html><body>";
                for (var key in body) {
                    if (body.hasOwnProperty(key)) {
                        s += "<div id='" + key + "'>";
                        s += body[key];
                        s += "</div>";
                    }
                }
                s += "</body></html>";
                return s;
            }
        }
    };

    _.defaults(options, {}); // place holder for potential SSL


// -- Start Verify Connection to http://forecast.io/
//    var deferred = Q.defer();
//    setTimeout(function () {
//
//
//    }, 0);
// -- End Verify Connection to http://forecast.io/

    console.log('APIKEY detected as ', conf.get('APIKEY'));

    var server = restify.createServer(options);
    server.pre(restify.pre.sanitizePath())
        .use(restify.requestLogger({serializers: stdSerializers}))
        // .use(restify.CORS())
        .use(restify.fullResponse())
        .use(logger.accessLogger)
        .use(logger.errorLogger)
        .use(restify.acceptParser(options.acceptable))
        .use(restify.dateParser())
        .use(restify.queryParser())   // Maps the query parameters to the req.params
        .use(restify.bodyParser());    // The bodyParser remaps the body content of a request to the req.params variable, allowing both GET and POST/PUT routes to use the same interface, fairly handy when you want to re-use code.

    geodata.load().then(function (staticGeoData) {
        console.log('Attaching Services');
        server.staticGeoData = staticGeoData; // given my time constraints, this was the best thing I could do. I dont like it.
        var pingEndpoint = require('./routes/ping')(server);
        var weatherEndpoint = require('./routes/weather')(server);
        console.log('Done Attaching Services');
    }, function (reason) {
        console.log('Failed to load city data', reason);
    });

    module.exports = server;
}());