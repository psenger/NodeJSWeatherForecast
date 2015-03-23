(function () {
    'use strict';

    var vows = require('vows'),
        assert = require('assert'),
        strings = require('../../app/util/strings');

    var suite = vows.describe("Test String Utils");

    suite.addBatch({
        'lpad When passed nothing': {
            topic: function () {
                return strings.lpad();
            },
            'I expect blank.': function (topic) {
                assert.equal("", topic);
            }
        },
        'lpad When passed all nulls': {
            topic: function () {
                return strings.lpad(null, null, null);
            },
            'I expect blank.': function (topic) {
                assert.equal("", topic);
            }
        },
        'lpad When passed a valid number with null width': {
            topic: function () {
                return strings.lpad(10, null, null);
            },
            'I expect that same number as a string.': function (topic) {
                assert.equal("10", topic);
            }
        },
        'lpad When passed a valid negative number with null width': {
            topic: function () {
                return strings.lpad(-10, null, null);
            },
            'I expect that same number as a string': function (topic) {
                assert.equal("-10", topic);
            }
        },
        'lpad When passed a valid number a width value that is smaller': {
            topic: function () {
                return strings.lpad(100, 1, null);
            },
            'I expect that same number as a string': function (topic) {
                assert.equal("100", topic);
            }
        },
        'lpad When passed a valid number a width value that is larger': {
            topic: function () {
                return strings.lpad(1, 5, null);
            },
            'I expect that same number but left padded with 0s': function (topic) {
                assert.equal("00001", topic);
            }
        },
        'lpad When passed a valid negative number a width value that is larger': {
            topic: function () {
                return strings.lpad(-1, 5, null);
            },
            'I expect that same number but left padded with 0s': function (topic) {
                assert.equal("000-1", topic);
            }
        },
        'lpad When passed a valid number a width value that is larger and a prefix': {
            topic: function () {
                return strings.lpad(9, 5, "x");
            },
            'I expect that same number but left padded with x-s': function (topic) {
                assert.equal("xxxx9", topic);
            }
        }
    });

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
    });

    suite.run();

}());