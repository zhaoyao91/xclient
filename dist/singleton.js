"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (buildInstance) {
  var instance = void 0;
  return function () {
    if (!instance) {
      instance = buildInstance.apply(undefined, arguments);
    }
    return instance;
  };
};