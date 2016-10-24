'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (store) {
  return function (mapper) {
    if (!mapper) {
      mapper = function mapper(newState, oldState) {
        return { state: newState };
      };
    } else if ((typeof mapper === 'undefined' ? 'undefined' : _typeof(mapper)) === 'object') {
      (function () {
        var map = mapper;
        mapper = function mapper(newState, oldState) {
          return _lodash2.default.mapValues(map, function (value, key) {
            return _lodash2.default.get(newState, value || key);
          });
        };
      })();
    }
    return function (Component) {
      return function (_React$Component) {
        _inherits(StateProvider, _React$Component);

        function StateProvider() {
          var _ref;

          var _temp, _this, _ret2;

          _classCallCheck(this, StateProvider);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret2 = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StateProvider.__proto__ || Object.getPrototypeOf(StateProvider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            oldState: store.get(),
            newState: store.get()
          }, _temp), _possibleConstructorReturn(_this, _ret2);
        }

        _createClass(StateProvider, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            var _this2 = this;

            this._id = store.subscribe(function (newState, oldState) {
              _this2.setState({ newState: newState, oldState: oldState });
            });
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            store.unsubscribe(this._id);
          }
        }, {
          key: 'render',
          value: function render() {
            return _react2.default.createElement(Component, this.getProps());
          }
        }, {
          key: 'getProps',
          value: function getProps() {
            var _state = this.state;
            var newState = _state.newState;
            var oldState = _state.oldState;

            var state = mapper(newState, oldState);
            return Object.assign({}, state, this.props);
          }
        }]);

        return StateProvider;
      }(_react2.default.Component);
    };
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