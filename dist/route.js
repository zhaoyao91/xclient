'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routeParser = require('route-parser');

var _routeParser2 = _interopRequireDefault(_routeParser);

var _querystringify = require('querystringify');

var _querystringify2 = _interopRequireDefault(_querystringify);

var _location_state = require('./location_state');

var _location_state2 = _interopRequireDefault(_location_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = function () {
  /**
   * @param path
   * @param options
   */
  function Route(path, options) {
    _classCallCheck(this, Route);

    this._path = path;
    this._route = new _routeParser2.default(path);
    this.options = options;
  }

  _createClass(Route, [{
    key: 'match',
    value: function match(path) {
      if (this._path === '*') return {};else return this._route.match(path);
    }
  }, {
    key: 'path',
    value: function path(params, query) {
      var pathname = this._route.reverse(params);
      return pathname + _querystringify2.default.stringify(query, true);
    }
  }, {
    key: 'go',
    value: function go(params, query) {
      _location_state2.default.setPath(this.path(params, query));
    }
  }]);

  return Route;
}();

exports.default = Route;