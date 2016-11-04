'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _querystringify = require('querystringify');

var _querystringify2 = _interopRequireDefault(_querystringify);

var _location_state = require('./location_state');

var _location_state2 = _interopRequireDefault(_location_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router() {
    var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Router);

    this.routes = routes;
  }

  _createClass(Router, [{
    key: 'route',
    value: function route(id, path, options) {
      this.routes[id] = new _route2.default(path, options);
    }
  }, {
    key: 'setRoute',
    value: function setRoute(id, route) {
      this.routes[id] = route;
    }
  }, {
    key: 'setRoutes',
    value: function setRoutes(routes) {
      this.routes = routes;
    }
  }, {
    key: 'match',
    value: function match(path) {
      return this._findOne(function (id, route) {
        var params = route.match(path);
        if (params) return { id: id, route: route, params: params };
      });
    }
  }, {
    key: 'path',
    value: function path(id, params, query) {
      var route = this.routes[id];
      if (route) return route.path(params, query);else return id + _querystringify2.default.stringify(query, true);
    }
  }, {
    key: 'go',
    value: function go(id, params, query) {
      var path = this.path(id, params, query);
      _location_state2.default.setPath(path);
    }
  }, {
    key: 'current',
    value: function current() {
      return this.match(location.pathname);
    }
  }, {
    key: '_findOne',
    value: function _findOne(callback) {
      for (var id in this.routes) {
        if (this.routes.hasOwnProperty(id)) {
          var route = this.routes[id];
          var result = callback(id, route);
          if (result) return result;
        }
      }
    }
  }]);

  return Router;
}();

exports.default = Router;