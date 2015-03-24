#!/usr/bin/env node

var app = require('../app/index');
var conf = require('../app/util/conf');

console.log( conf.get("port") );
// This will launch the server.
var server = app.listen(conf.get("port") || 8080, function () {
    console.log('%s listening at %s on port %s', app.name, app.url, app.address().port);
});

