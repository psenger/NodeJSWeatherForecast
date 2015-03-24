#!/usr/bin/env node

var app = require('../app/index');
var conf = require('../app/util/conf');

// This will launch the server.
var server = app.listen(process.env.PORT || conf.get("port"), function () {
    console.log('%s listening at %s on port %s', app.name, app.url, app.address().port);
});

