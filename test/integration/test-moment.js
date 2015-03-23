(function () {
    'use strict';

    var vows = require('vows'),
        assert = require('assert'),
        moment = require('moment');

    var suite = vows.describe("Test Integration Points for moment");

    suite.addBatch({
        'When calling moment with valid unix': {
            topic: function () {
                return moment.unix(1427063848);
            },
            'I expect a 403 response code.': function (err, result) {
                assert.equal(result.weekday(), 1);
            }
        },
        'When calling moment with invalid values': {
            topic: function () {
                moment.localeData('en-au');
                var dow = [1427029200, 1427115600, 1427202000, 1427288400, 1427374800, 1427461200, 1427547600];
                var momments = [];
                for (var i = 0; i < dow.length; i++) {
                    var obj = dow[i];
                    momments.push(moment.weekdays(moment.unix(obj).day()));
                }
                return momments;
            },
            'I expect a 403 response code.': function (err, result) {
                assert.ok(result);
                assert.equal(result[0], 'Monday');
                assert.equal(result[1], 'Tuesday');
                assert.equal(result[2], 'Wednesday');
                assert.equal(result[3], 'Thursday');
                assert.equal(result[4], 'Friday');
                assert.equal(result[5], 'Saturday');
                assert.equal(result[6], 'Sunday');
            }
        }
    }).export(module);

}());