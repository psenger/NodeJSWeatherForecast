(function () {
    'use strict';

    var vows = require('vows'),
        assert = require('assert'),
        restify = require('restify');

    var suite = vows.describe("Test Points for the application");

    suite.addBatch({
        'When calling moment with valid values': {
            topic: function () {
                var client = restify.createJsonClient({
                    url: 'https://127.0.0.1:9090',
                    version: '*'
                });
                client.get('/weather/sydney/today', this.callback);
                //var request = http.get("http://0.0.0.0:9090/weather/sydney/today", function (response) {
                //    // data is streamed in chunks from the server
                //    // so we have to handle the "data" event
                //    var buffer = "",
                //        data,
                //        route;
                //
                //    response.on("data", function (chunk) {
                //        buffer += chunk;
                //    });
                //
                //    response.on("end", function (err) {
                //        // finished transferring data
                //        // dump the raw data
                //        console.log(buffer);
                //        console.log("\n");
                //        data = JSON.parse(buffer);
                //        route = data.routes[0];
                //
                //        // extract the distance and time
                //        //console.log("Walking Distance: " + route.legs[0].distance.text);
                //        //console.log("Time: " + route.legs[0].duration.text);
                //    });
                //
                //});
            },
            'I expect a 403 response code.': function (err, req, res, data) {
                /**
                 function(err, req, res, obj) {
                    assert.ifError(err);
                    console.log('%j', obj);
                }
                 */
                    // console.log('%d -> %j', result.statusCode, result.headers);
                console.log(arguments);
            }
        }
    });

    suite.run();

}());