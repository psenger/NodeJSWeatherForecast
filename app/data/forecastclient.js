(function () {
    'use strict';

    var Q = require('q'),
        moment = require("moment"),
        restify = require('restify'),
        ForecastIo = require('forecastio'),
        conf = require('../util/conf'),
        util = require('../util/index');

    var exports = module.exports;

    exports.fetch = function (req, res, next) {
        res.charSet('utf-8');
        /**
         * ------------------
         * Strangely, none of the following work.
         * ------------------
         var x = req.is('html');
         var y = req.is('text/html');
         var z = req.is('json');
         var u = req.is('application/json');
         */
        if (req && req.params && req.params.location) {
            var location = util.strings.nullSafeLowerCase(req.params.location);
            var weekday = util.strings.nullSafeLowerCase(req.params.weekday);
            if (weekday === '') {
                weekday = "today";
            }
            var latLongArray = this.staticGeoData.getLatLongForCity(location);
            if (latLongArray) {
                var lat = latLongArray[1];
                var long = latLongArray[2];
                var forecastIo = new ForecastIo(conf.get('APIKEY'));
                //@todo there is a better way of doing callback promises with Node.
                var deferred = Q.defer();
                setTimeout(function () {
                    forecastIo.forecast(lat, long, function (err, data) {
                        if (err) {
                            req.log.error(err);
                            deferred.reject(err);
                        } else {
                            deferred.resolve(data);
                        }
                    });
                }, 0);
                deferred.promise.then(
                    function (data) {
                        moment.localeData('en-au');
                        if (data) {
                            if (weekday === 'today') {
                                res.send(data.currently);
                                next();
                            } else {
                                for (var i = 0; i < data.daily.data.length; i++) {
                                    var day = util.strings.nullSafeLowerCase(moment.weekdays(moment.unix(data.daily.data[i].time).day()));
                                    if (day === weekday) {
                                        var outbound = data.daily.data[i];
                                        // outbound.mydate = moment.unix(data.daily.data[i].time).toISOString();
                                        res.send(outbound);
                                        next();
                                    }
                                }
                            }
                            req.log.error("Invalid time specified", weekday);
                            return next(new restify.InvalidArgumentError("Invalid time specified"));
                        } else {
                            return next(new restify.NotFoundError("Forecast not found for given location and time"));
                        }
                    },
                    function (err) {
                        req.log.error(err);
                        return next(new restify.InternalServerError("An Internal error has occurred"));
                    }
                );
            } else {
                req.log.error("Invalid location specified, no data");
                return next(new restify.NotFoundError("Error: Unknown location provided"));
            }
        } else {
            req.log.error("Invalid location specified, no data");
            return next(new restify.InvalidArgumentError("Error: Missing location parameter"));
        }
    };

}());