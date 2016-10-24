'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (store) {
  var stateName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'location';

  var storeSubscriptionId = store.subscribe(function (state) {
    var locationState = _lodash2.default.get(state, stateName);

    if (!isCurrentLocation(locationState)) {
      _url_helper2.default.changeUrl(buildPath(locationState));
    }
  });

  function handleUrlChange() {
    var locationState = store.get(stateName);

    if (!isCurrentLocation(locationState)) {
      store.set(stateName, {
        pathname: location.pathname,
        query: _querystringify2.default.parse(location.search)
      });
    }
  }

  _url_helper2.default.onUrlChange(handleUrlChange);

  return {
    stop: function stop() {
      store.unsubscribe(storeSubscriptionId);
      _url_helper2.default.offUrlChange(handleUrlChange);
    },
    syncFromLocation: function syncFromLocation() {
      store.set(stateName, {
        pathname: location.pathname,
        query: _querystringify2.default.parse(location.search)
      });
    },
    syncFromStore: function syncFromStore() {
      _url_helper2.default.changeUrl(buildPath(store.get(stateName)));
    }
  };
};

var _querystringify = require('querystringify');

var _querystringify2 = _interopRequireDefault(_querystringify);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _url_helper = require('./url_helper');

var _url_helper2 = _interopRequireDefault(_url_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildPath(state) {
  if (!state || !state.pathname) return '/';else {
    var pathname = state.pathname;
    var query = state.query;

    return pathname + _querystringify2.default.stringify(query, true);
  }
}

function isCurrentLocation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var pathname = location.pathname;
  var query = _querystringify2.default.parse(location.search);
  return pathname === state.pathname && _lodash2.default.isEqual(query, state.query);
}