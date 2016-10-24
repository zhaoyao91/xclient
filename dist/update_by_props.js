'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function () {
  var props = void 0;
  var deep = false;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args && args.length > 0) {
    if (_lodash2.default.isBoolean(_lodash2.default.last(args))) {
      props = _lodash2.default.initial(args);
      deep = _lodash2.default.last(args);
    } else props = args;
  }

  var shouldUpdate = void 0;
  if (props) {
    if (deep) {
      shouldUpdate = function shouldUpdate(oldProps, newProps) {
        oldProps = _lodash2.default.pick(oldProps, props);
        newProps = _lodash2.default.pick(newProps, props);
        return !_lodash2.default.isEqual(oldProps, newProps);
      };
    } else {
      shouldUpdate = function shouldUpdate(oldProps, newProps) {
        oldProps = _lodash2.default.pick(oldProps, props);
        newProps = _lodash2.default.pick(newProps, props);
        return !shallowEqual(oldProps, newProps);
      };
    }
  } else {
    if (deep) {
      shouldUpdate = function shouldUpdate(oldProps, newProps) {
        return !_lodash2.default.isEqual(oldProps, newProps);
      };
    } else {
      shouldUpdate = function shouldUpdate(oldProps, newProps) {
        return !shallowEqual(oldProps, newProps);
      };
    }
  }

  return function (Component) {
    return function (_React$Component) {
      _inherits(UpdateByProps, _React$Component);

      function UpdateByProps() {
        _classCallCheck(this, UpdateByProps);

        return _possibleConstructorReturn(this, (UpdateByProps.__proto__ || Object.getPrototypeOf(UpdateByProps)).apply(this, arguments));
      }

      _createClass(UpdateByProps, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          return shouldUpdate(this.props, nextProps);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(Component, this.props);
        }
      }]);

      return UpdateByProps;
    }(_react2.default.Component);
  };
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function shallowEqual(a, b) {
  for (var key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for (var key in b) {
    if (!(key in a) || a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}