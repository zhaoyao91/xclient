const eventType = 'popstate';

export default {
  onUrlChange(listener) {
    window.addEventListener(eventType, listener);
  },

  offUrlChange(lisenter) {
    window.removeEventListener(eventType, listener);
  },

  changeUrl(url) {
    history.pushState(null, null, url);
    window.dispatchEvent(new Event(eventType));
  }
}