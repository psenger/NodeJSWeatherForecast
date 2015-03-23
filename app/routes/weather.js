(function () {
    "use strict";
    module.exports = function (server) {
        var forecastclient = require('../data/forecastclient');
        /**
         * I could have done something fancy with regular expressions, but decided to keep it simple.
         */
        server.get('/weather/:location/', forecastclient.fetch);
        server.get('/weather/:location/:weekday', forecastclient.fetch);
    };
}());