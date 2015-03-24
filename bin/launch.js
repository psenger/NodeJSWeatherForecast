#!/usr/bin/env node

var app = require('../app/index');
var conf = require('../app/util/conf');

console.log( process.env.PORT );
// This will launch the server.
var server = app.listen( process.env.PORT, function () {
    console.log('%s listening at %s on port %s', app.name, app.url, app.address().port);
});

