(function () {
    'use strict';
    var path = require('path'),
        fs = require('fs'),
        Q = require('q'),
        csv = require("fast-csv"),
        util = require('../util/index');

    var exports = module.exports = {};

    exports.localData = {};

    exports.load = function () {
        var deferred = Q.defer();
        setTimeout(function () {
            csv.fromPath(path.join(__dirname, 'data-sm.csv'))
                .on("data", function (data) {
                    exports.localData[data[0]] = data;
                })
                .on("error", function (data) {
                    deferred.reject();
                })
                .on("end", function () {
                    deferred.resolve(exports);
                });
        }, 0);
        return deferred.promise;
    };

    exports.getLatLongForCity = function (city) {
        city = util.strings.nullSafeLowerCase(city);
        if (exports.localData && exports.localData[city]) {
            return exports.localData[city];
        }
        return null;
    };

}());