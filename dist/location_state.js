'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _querystringify = require('querystringify');

var _querystringify2 = _interopRequireDefault(_querystringify);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventType = 'popstate';
var listeners = {};
var listenersCount = 0;

var locationState = {
  getPath: function getPath() {
    return location.pathname + location.search;
  },
  getPathname: function getPathname() {
    return location.pathname;
  },
  getQuery: function getQuery() {
    return _querystringify2.default.parse(location.search);
  },
  setPath: function setPath(path) {
    history.pushState(null, null, path);
    window.dispatchEvent(new Event(eventType));
  },
  setPathname: function setPathname(pathname) {
    history.pushState(null, null, pathname + location.search);
    window.dispatchEvent(new Event(eventType));
  },
  setQuery: function setQuery(query) {
    history.pushState(null, null, location.pathname + _querystringify2.default.stringify(query));
    window.dispatchEvent(new Event(eventType));
  },
  subscribe: function subscribe(listener) {
    listenersCount = listenersCount + 1;
    listeners[listenersCount] = listener;
    return listenersCount;
  },
  unsubscribe: function unsubscribe(id) {
    delete listeners[id];
  }
};

window.addEventListener(eventType, function () {
  var state = {
    path: location.pathname + location.search,
    pathname: location.pathname,
    query: _querystringify2.default.parse(location.search)
  };
  _lodash2.default.forEach(listeners, function (listener) {
    return listener(state);
  });
});

exports.default = locationState;