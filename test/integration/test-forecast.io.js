(function () {
    'use strict';

    var vows = require('vows'),
        assert = require('assert'),
        ForecastIo = require('forecastio'),
        conf = require('../../app/util/conf');

    var suite = vows.describe("Test Integration Points for ForeCastIo");

    suite.addBatch({
        'When connecting to forecastio with Bad APIKEY': {
            topic: function () {
                var forecastIo = new ForecastIo("abcdefghijklmnop");
                forecastIo.forecast('51.506', '-0.127', this.callback);
            },
            'I expect a 403 response code.': function (err, result) {
                assert.ok(err);
                assert.ok(err.response);
                assert.equal(err.response.statusCode, 403);
            }
        },
        //'When connecting to forecastio with good APIKEY and my location': {
        //    topic: function () {
        //        var forecastIo = new ForecastIo(  conf.get('APIKEY') );
        //        forecastIo.forecast( '-33.814556', '151.169895', this.callback );
        //    },
        //    'I expect a 403 response code.': function ( err, result  ) {
        //        console.log( JSON.stringify( result, null , '\t' ) );
        //    }
        //},
        'When connecting with valid key and a valid lat lon': {
            topic: function () {
                var forecastIo = new ForecastIo(conf.get('APIKEY'));
                forecastIo.forecast('51.506', '-0.127', this.callback);
            },
            'I expect a forecast.': function (err, result) {
                // console.log( JSON.stringify( result, null , '\t' ) );
                assert.ok(result);
                assert.ok(result.latitude);
                assert.ok(result.longitude);
            }
        },
        'When connecting with valid key but garbage': {
            topic: function () {
                var forecastIo = new ForecastIo(conf.get('APIKEY'));
                forecastIo.forecast('abc', 'defgh', this.callback);
            },
            'I expect a forecast.': function (err, result) {
                //console.log( JSON.stringify( err, null , '\t' ) );
                assert.ok(err);
                assert.ok(err.response);
                assert.equal(err.response.statusCode, 400);
            }
        },
        'When connecting with valid key valid parameters but I have mangled the URL simulating a bad connection': {
            topic: function () {
                var forecastIo = new ForecastIo(conf.get('APIKEY'));
                forecastIo.baseUrl = 'https://abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz/forecast/' + conf.get('APIKEY') + '/';
                forecastIo.forecast('51.506', '-0.127', this.callback);
            },
            'I expect an error.': function (err, result) {
                assert.ok(err);
                assert.ok(err.name);
                assert.equal(err.name, 'ForecastIoError');
            }
        }
    });

    suite.run();

}());