(function () {
    'use strict';

    var vows = require('vows'),
        assert = require('assert'),
        geodata = require('../../app/data/geodata');

    var suite = vows.describe("Test geodata");

    //suite.addBatch({
    //    'geodata has not been loaded, and nothing passed to getLatLongForCity': {
    //        topic: function () {
    //            return geodata.getLatLongForCity();
    //        },
    //        'I expect null.': function (topic) {
    //            assert.equal(null, topic);
    //        }
    //    },
    //    'geodata has not been loaded, and known missing valid value passed': {
    //        topic: function () {
    //            return geodata.getLatLongForCity('xanadu');
    //        },
    //        'I expect null.': function (topic) {
    //            assert.equal(null, topic);
    //        }
    //    },
    //    'geodata has not been loaded, and null passed': {
    //        topic: function () {
    //            return geodata.getLatLongForCity(null);
    //        },
    //        'I expect null.': function (topic) {
    //            assert.equal(null, topic);
    //        }
    //    },
    //    'geodata has not been loaded, and valid value passed': {
    //        topic: function () {
    //            return geodata.getLatLongForCity('sydney');
    //        },
    //        'I expect null.': function (topic) {
    //            assert.equal(null, topic);
    //        }
    //    },
    //    'geodata is fully loaded and passed a nothing for city': {
    //        topic: function () {
    //            geodata.load().then(
    //                this.callback,
    //                this.callback
    //            ).catch(this.callback);
    //        },
    //        'and passed a nothing for city': {
    //            topic: function (result, err) {
    //                return geodata.getLatLongForCity();
    //            },
    //            'expect null': function (topic) {
    //                assert.equal(null, topic);
    //            }
    //        }
    //    },
    //    'geodata is fully loaded and passed a null for city': {
    //        topic: function () {
    //            geodata.load().then(
    //                this.callback,
    //                this.callback
    //            ).catch(this.callback);
    //        },
    //        'and passed a null for city': {
    //            topic: function (result, err) {
    //                return geodata.getLatLongForCity(null);
    //            },
    //            'expect null': function (topic) {
    //                assert.equal(null, topic);
    //            }
    //        }
    //    },
    //    'geodata is fully loaded and passed a invalid city': {
    //        topic: function () {
    //            geodata.load().then(
    //                this.callback,
    //                this.callback
    //            ).catch(this.callback);
    //        },
    //        'and passed invalid city': {
    //            topic: function (result, err) {
    //                return geodata.getLatLongForCity('xanadu');
    //            },
    //            'expect null': function (topic) {
    //                assert.equal(null, topic);
    //            }
    //        }
    //    },
    //    'geodata is fully loaded and passed a valid city': {
    //        topic: function () {
    //            geodata.load().then(
    //                this.callback,
    //                this.callback
    //            ).catch(this.callback);
    //        },
    //        'and passed valid city': {
    //            topic: function (result, err) {
    //                return geodata.getLatLongForCity('sydney');
    //            },
    //            'expect a lat and long': function (topic) {
    //                assert.ok(topic);
    //                assert.equal('-33.86785', topic[1]);
    //                assert.equal('151.20732', topic[2]);
    //            }
    //        }
    //    }
    //}).export(module);

}());