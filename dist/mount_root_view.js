"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (rootView) {
  var root = document.createElement("div");
  root.id = 'root';
  document.body.appendChild(root);
  _reactDom2.default.render(rootView, root);
};

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }