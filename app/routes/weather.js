(function () {
    "use strict";
    module.exports = function (server) {
        var forecastclient = require('../data/forecastclient');
        server.get('/weather/:location/:weekday', forecastclient.fetch);
    };
}());