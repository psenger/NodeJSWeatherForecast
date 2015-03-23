(function () {
    "use strict";
    var restify = require('restify'),
        moment = require('moment');
    var exports = module.exports = function (server) {
        server.get('/ping', function (req, res, next) {
            res.send({time: moment().unix()});
            next();
        });
    };
}());