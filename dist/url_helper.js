'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var eventType = 'popstate';

exports.default = {
  onUrlChange: function onUrlChange(listener) {
    window.addEventListener(eventType, listener);
  },
  offUrlChange: function offUrlChange(lisenter) {
    window.removeEventListener(eventType, listener);
  },
  changeUrl: function changeUrl(url) {
    history.pushState(null, null, url);
    window.dispatchEvent(new Event(eventType));
  }
};