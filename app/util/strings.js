/**
 * Strings is a collection of string related functions used for formatting.
 */
(function () {
    'use strict';
    var exports = module.exports = {};
    /**
     * Left Pad a number 'number' of 'width' with prefix (default 0)...
     *
     * @param number a number to left pad
     * @param width width of the padded string you want.
     * @param prefix optional defaults to zero
     * @returns {string}
     */
    exports.lpad = function (number, width, prefix) {
        number = number || '';
        width = width || 0;
        prefix = prefix || '0';
        number = number + '';
        return number.length >= width ? number : new Array(width - number.length + 1).join(prefix) + number;
    };
    /**
     * Null Safe Lower case, returns blank if null. this is a english only function.
     * if val has to be a primitive, or blank is returned.
     *
     * @param val
     * @returns {string}
     */
    exports.nullSafeLowerCase = function (val) {
        if (typeof val === 'object') {
            return '';
        }
        if (val) {
            return ( val + '' ).toLowerCase();
        }
        return '';
    };
}());