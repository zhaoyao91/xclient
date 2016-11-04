'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (options) {
  var scrollHelper = {
    _records: {},
    saveScroll: function saveScroll(id) {
      this._records[id] = document.body.scrollTop;
    },
    loadScroll: function loadScroll(id) {
      document.body.scrollTop = this._records[id];
    },
    clearScroll: function clearScroll(id) {
      delete this._records[id];
    }
  };

  var Cache = (0, _reactViewCache2.default)(Object.assign({}, options, {
    hooks: {
      beforeSwitch: function beforeSwitch(oldId, newId) {
        if (oldId) scrollHelper.saveScroll(oldId);
      },
      afterSwitch: function afterSwitch(oldId, newId) {
        if (newId) scrollHelper.loadScroll(newId);
      },
      beforeRemove: function beforeRemove(id) {
        if (id) scrollHelper.clearScroll(id);
      }
    }
  }));

  var CachedPages = function (_React$Component) {
    _inherits(CachedPages, _React$Component);

    function CachedPages() {
      _classCallCheck(this, CachedPages);

      return _possibleConstructorReturn(this, (CachedPages.__proto__ || Object.getPrototypeOf(CachedPages)).apply(this, arguments));
    }

    _createClass(CachedPages, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            location = _props.location,
            routes = _props.routes;

        var _loop = function _loop(id) {
          var route = routes[id];
          var params = route.match(location.pathname);
          if (params) {
            var _ret2 = function () {
              var Page = route.options.page;
              var page = function page(_ref) {
                var isActive = _ref.isActive;
                return _react2.default.createElement(Page, { params: params, query: location.query, isActive: isActive });
              };
              var viewId = route._path === '*' ? 'not-found' : location.pathname;
              return {
                v: {
                  v: _react2.default.createElement(Cache, { viewId: viewId, view: page, cacheTime: route.options.cacheTime })
                }
              };
            }();

            if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
          }
        };

        for (var id in routes) {
          var _ret = _loop(id);

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }

        return _react2.default.createElement(Cache, { viewId: 'not-found', view: _react2.default.createElement(
            'div',
            null,
            'not found'
          ) });
      }
    }]);

    return CachedPages;
  }(_react2.default.Component);

  return CachedPages;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactViewCache = require('react-view-cache');

var _reactViewCache2 = _interopRequireDefault(_reactViewCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }