'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, composers = Array(_len), _key = 0; _key < _len; _key++) {
    composers[_key] = arguments[_key];
  }

  return function (component) {
    return _lodash2.default.reduce(composers, function (component, compose) {
      return compose(component);
    }, component);
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }