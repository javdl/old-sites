'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = groupBy;

var _hasOwnProperty = require('./hasOwnProperty');

var _hasOwnProperty2 = _interopRequireDefault(_hasOwnProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @name baseAssignValue
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The order of grouped values
 * is determined by the order they occur in `collection`. The corresponding
 * value of each key is an array of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @name groupBy
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 */
function groupBy(collection, iteratee) {
  return collection.reduce(function (result, value, key) {
    key = iteratee(value);
    if ((0, _hasOwnProperty2.default)(result, key)) {
      result[key].push(value);
    } else {
      baseAssignValue(result, key, [value]);
    }

    return result;
  }, {});
}
module.exports = exports['default'];

//# sourceMappingURL=groupBy.js.map