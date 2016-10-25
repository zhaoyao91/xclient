'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _location_state = require('./location_state');

var _location_state2 = _interopRequireDefault(_location_state);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(_mapper) {
  if (!_mapper) {
    _mapper = function mapper(state) {
      return { location: state };
    };
  } else if (typeof _mapper === 'string') {
    _mapper = function mapper(state) {
      return _defineProperty({}, _mapper, state);
    };
  } else if ((typeof _mapper === 'undefined' ? 'undefined' : _typeof(_mapper)) === 'object') {
    (function () {
      var map = _mapper;
      _mapper = function _mapper(state) {
        return _.mapValues(map, function (value, key) {
          return _.get(state, value || key);
        });
      };
    })();
  }
  return function (Component) {
    return function (_React$Component) {
      _inherits(LocationProvider, _React$Component);

      function LocationProvider() {
        var _ref2;

        var _temp, _this, _ret2;

        _classCallCheck(this, LocationProvider);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret2 = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = LocationProvider.__proto__ || Object.getPrototypeOf(LocationProvider)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
          location: {
            path: _location_state2.default.getPath(),
            pathname: _location_state2.default.getPathname(),
            query: _location_state2.default.getQuery()
          }
        }, _temp), _possibleConstructorReturn(_this, _ret2);
      }

      _createClass(LocationProvider, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          this._id = _location_state2.default.subscribe(function (state) {
            _this2.setState({ location: state });
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          _location_state2.default.unsubscribe(this._id);
        }
      }, {
        key: 'render',
        value: function render() {
          var location = this.state.location;

          var locationProps = _mapper(location);
          return _react2.default.createElement(Component, _extends({}, locationProps, this.props));
        }
      }]);

      return LocationProvider;
    }(_react2.default.Component);
  };
}
exports.default = _default;