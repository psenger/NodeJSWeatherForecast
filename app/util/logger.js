/**
 * logger is merely set of steps to configure the loggers.
 */
(function () {
    'use strict';
    var fs = require('fs'),
        strings = require('./strings');
    var exports = module.exports = {};
    var now = new Date();
    var accessLogName = "access-" + now.getFullYear() + "-" + strings.lpad(now.getMonth(), 2) + "-" + strings.lpad(now.getDate(), 2) + ".log";
    var errorLogName = "error-" + now.getFullYear() + "-" + strings.lpad(now.getMonth(), 2) + "-" + strings.lpad(now.getDate(), 2) + ".log";
    var accessLogStream = fs.createWriteStream(__dirname + '/../../log/' + accessLogName, {
            flags: 'a'
        }
    );
    var errorLogStream = fs.createWriteStream(__dirname + '/../../log/' + errorLogName, {
            flags: 'a'
        }
    );
    exports.accessLogger = require('morgan')('combined', {
            stream: accessLogStream,
            skip: function (req, res) {
                return ( res.statusCode >= 400 );
            }
        }
    );
    exports.errorLogger = require('morgan')('combined', {
            stream: errorLogStream,
            skip: function (req, res) {
                return ( res.statusCode < 400 );
            }
        }
    );
}());