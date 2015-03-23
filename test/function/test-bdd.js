(function () {
    'use strict';

    var request = require('request'),
        vows = require('vows'),
        assert = require('assert');

    vows.describe('As the Customer, I want to get a weather forecast by location so I can determine if I need an umbrella or sun screen.').addBatch({
        "As the Customer, I want to get a weather forecast by location for today": {
            topic: function () {
                request({
                    uri: 'http://localhost:9090/weather/sydney',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }, this.callback);
            },
            "should respond with 200": function (err, res, body) {
                assert.equal(res.statusCode, 200);
            },
            "should respond with a json body and time": function (err, res, body) {
                var result = JSON.parse(body);
                assert.ok(result.time );
            }
        },
        "As the Customer, I want to get a weather forecast by location and filtered by day": {
            topic: function () {
                request({
                    uri: 'http://localhost:9090/weather/sydney/saturday',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }, this.callback);
            },
            "should respond with 200": function (err, res, body) {
                assert.equal(res.statusCode, 200);
            },
            "should respond with a json body and time": function (err, res, body) {
                var result = JSON.parse(body);
                assert.ok(result.time );
            }
        },
        "As the Customer, I want to get a weather forecast by location, filtered by the word *today*": {
            topic: function () {
                request({
                    uri: 'http://localhost:9090/weather/sydney/today',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }, this.callback);
            },
            "should respond with 200": function (err, res, body) {
                assert.equal(res.statusCode, 200);
            },
            "should respond with a json body and time": function (err, res, body) {
                var result = JSON.parse(body);
                assert.ok(result.time );
            }
        }
    }).export(module);

    vows.describe('As the Front End Developer, I need to have the forecast data in either json and html format').addBatch({
        "As the Front End Developer, I want to get a weather forecast by location for today in JSON": {
            topic: function () {
                request({
                    uri: 'http://localhost:9090/weather/sydney',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }, this.callback);
            },
            "should respond with 200": function (err, res, body) {
                assert.equal(res.statusCode, 200);
            },
            "should respond with a json body and time": function (err, res, body) {
                var result = JSON.parse(body);
                assert.ok(result.time );
            }
        },
        "As the Front End Developer, I want to get a weather forecast by location and filtered by day in JSON": {
            topic: function () {
                request({
                    uri: 'http://localhost:9090/weather/sydney/saturday',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }, this.callback);
            },
            "should respond with 200": function (err, res, body) {
                assert.equal(res.statusCode, 200);
            },
            "should respond with a json body and time": function (err, res, body) {
                var result = JSON.parse(body);
                assert.ok(result.time );
            }
        },
        "As the Front End Developer, I want to get a weather forecast by location, filtered by the word *today* in JSON": {
            topic: function () {
                request({
                    uri: 'http://localhost:9090/weather/sydney/today',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }, this.callback);
            },
            "should respond with 200": function (err, res, body) {
                assert.equal(res.statusCode, 200);
            },
            "should respond with a json body and time": function (err, res, body) {
                var result = JSON.parse(body);
                assert.ok(result.time );
            }
        },
        "As the Front End Developer, I want to get a weather forecast by location for today in html": {
            topic: function () {
                request({
                    uri: 'http://localhost:9090/weather/sydney',
                    method: 'GET',
                    headers: {
                        'Accept': 'text/html'
                    }
                }, this.callback);
            },
            "should respond with 200": function (err, res, body) {
                assert.equal(res.statusCode, 200);
            },
            "should respond with a json body and time": function (err, res, body) {
                assert.ok( body );
                var index = body.search('<html>');
                assert.notEqual (index, -1);
                index = body.search('</html>');
                assert.notEqual (index, -1);
            }
        },
        "As the Front End Developer, I want to get a weather forecast by location and filtered by day in html": {
            topic: function () {
                request({
                    uri: 'http://localhost:9090/weather/sydney/saturday',
                    method: 'GET',
                    headers: {
                        'Accept': 'text/html'
                    }
                }, this.callback);
            },
            "should respond with 200": function (err, res, body) {
                assert.equal(res.statusCode, 200);
            },
            "should respond with a json body and time": function (err, res, body) {
                assert.ok( body );
                var index = body.search('<html>');
                assert.notEqual (index, -1);
                index = body.search('</html>');
                assert.notEqual (index, -1);
            }
        },
        "As the Front End Developer, I want to get a weather forecast by location, filtered by the word *today* in HTML": {
            topic: function () {
                request({
                    uri: 'http://localhost:9090/weather/sydney/today',
                    method: 'GET',
                    headers: {
                        'Accept': 'text/html'
                    }
                }, this.callback);
            },
            "should respond with 200": function (err, res, body) {
                assert.equal(res.statusCode, 200);
            },
            "should respond with a json body and time": function (err, res, body) {
                assert.ok( body );
                var index = body.search('<html>');
                assert.notEqual (index, -1);
                index = body.search('</html>');
                assert.notEqual (index, -1);
            }
        }
    }).export(module);

}());