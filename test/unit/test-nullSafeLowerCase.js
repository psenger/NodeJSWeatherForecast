(function () {
    'use strict';

    var vows = require('vows'),
        assert = require('assert'),
        strings = require('../../app/util/strings');

    var suite = vows.describe("Test Null Safe LowerCase Utils");

    suite.addBatch({
        'nullSafeLowerCase when passed nothing': {
            topic: function () {
                return strings.nullSafeLowerCase();
            },
            'I expect blank.': function (topic) {
                assert.equal("", topic);
            }
        },
        'nullSafeLowerCase when passed null': {
            topic: function () {
                return strings.nullSafeLowerCase(null);
            },
            'I expect blank.': function (topic) {
                assert.equal("", topic);
            }
        },
        'nullSafeLowerCase when passed valid string': {
            topic: function () {
                return strings.nullSafeLowerCase("ABCDEFGHIJKLMNOP");
            },
            'I expect blank.': function (topic) {
                assert.equal("abcdefghijklmnop", topic);
            }
        },
        'nullSafeLowerCase when passed valid number': {
            topic: function () {
                return strings.nullSafeLowerCase(12345);
            },
            'I expect blank.': function (topic) {
                assert.equal("12345", topic);
            }
        },
        'nullSafeLowerCase when passed valid negative number': {
            topic: function () {
                return strings.nullSafeLowerCase(-12345);
            },
            'I expect blank.': function (topic) {
                assert.equal("-12345", topic);
            }
        },
        'nullSafeLowerCase when passed object': {
            topic: function () {
                return strings.nullSafeLowerCase({name: 'foobar', totaltime: 1.222222});
            },
            'I expect blank.': function (topic) {
                assert.equal("", topic);
            }
        },
        'nullSafeLowerCase when passed array': {
            topic: function () {
                return strings.nullSafeLowerCase(['a', 'b', 'c']);
            },
            'I expect blank.': function (topic) {
                assert.equal("", topic);
            }
        }
    }).export(module);

}());