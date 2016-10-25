import qs from 'querystringify';
import _ from 'lodash';

const eventType = 'popstate';
const listeners = {};
let listenersCount = 0;

const locationState = {
  getPath() {
    return location.pathname + location.search
  },

  getPathname() {
    return location.pathname;
  },

  getQuery() {
    return qs.parse(location.search);
  },

  setPath(path) {
    history.pushState(null, null, path);
    window.dispatchEvent(new Event(eventType));
  },

  setPathname(pathname) {
    history.pushState(null, null, pathname + location.search);
    window.dispatchEvent(new Event(eventType));
  },

  setQuery(query) {
    history.pushState(null, null, location.pathname + qs.stringify(query));
    window.dispatchEvent(new Event(eventType));
  },

  subscribe(listener) {
    listenersCount = listenersCount + 1;
    listeners[ listenersCount ] = listener;
    return listenersCount;
  },

  unsubscribe(id) {
    delete listeners[ id ];
  }
};

window.addEventListener(eventType, () => {
  const state = {
    path: location.pathname + location.search,
    pathname: location.pathname,
    query: qs.parse(location.search)
  };
  _.forEach(listeners, listener => listener(state));
});

export default locationState;