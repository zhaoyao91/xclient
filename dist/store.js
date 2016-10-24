"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fp = require("lodash/fp");

var _fp2 = _interopRequireDefault(_fp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store(initialValues) {
    _classCallCheck(this, Store);

    if ((typeof initialValues === "undefined" ? "undefined" : _typeof(initialValues)) === 'object') this._state = _fp2.default.cloneDeep(initialValues);else this._state = {};

    this._listenerCounter = 0;
    this._listeners = {};
  }

  _createClass(Store, [{
    key: "set",
    value: function set(path, value) {
      var oldState = this._state;
      var newState = _fp2.default.assoc(path, value)(oldState);
      this._state = newState;
      this._notifyAll(oldState, newState);
    }
  }, {
    key: "get",
    value: function get(path) {
      if (!path) return this._state;else return _fp2.default.prop(path)(this._state);
    }
  }, {
    key: "unset",
    value: function unset(path) {
      var oldState = this._state;
      var newState = _fp2.default.dissoc(path)(oldState);
      this._state = newState;
      this._notifyAll(oldState, newState);
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      this._listenerCounter = this._listenerCounter + 1;
      var id = this._listenerCounter;
      this._listeners[id] = callback;
      return id;
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(id) {
      delete this._listeners[id];
    }
  }, {
    key: "_notifyAll",
    value: function _notifyAll(oldState, newState) {
      var _this = this;

      Object.keys(this._listeners).forEach(function (id) {
        var listener = _this._listeners[id];
        listener && listener(newState, oldState);
      });
    }
  }]);

  return Store;
}();

exports.default = Store;