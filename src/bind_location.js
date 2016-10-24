import qs from 'querystringify';
import _ from 'lodash';
import urlHelper from './url_helper';

export default function(store, stateName = 'location') {
  const storeSubscriptionId = store.subscribe((state) => {
    const locationState = _.get(state, stateName);

    if (!isCurrentLocation(locationState)) {
      urlHelper.changeUrl(buildPath(locationState));
    }
  });

  function handleUrlChange() {
    const locationState = store.get(stateName);

    if (!isCurrentLocation(locationState)) {
      store.set(stateName, {
        pathname: location.pathname,
        query: qs.parse(location.search)
      });
    }
  }

  urlHelper.onUrlChange(handleUrlChange);

  return {
    stop() {
      store.unsubscribe(storeSubscriptionId);
      urlHelper.offUrlChange(handleUrlChange);
    },

    syncFromLocation() {
      store.set(stateName, {
        pathname: location.pathname,
        query: qs.parse(location.search)
      });
    },

    syncFromStore() {
      urlHelper.changeUrl(buildPath(store.get(stateName)));
    }
  }
}

function buildPath(state) {
  if (!state || !state.pathname) return '/';
  else {
    const { pathname, query } = state;
    return pathname + qs.stringify(query, true);
  }
}

function isCurrentLocation(state = {}) {
  const pathname = location.pathname;
  const query = qs.parse(location.search);
  return pathname === state.pathname && _.isEqual(query, state.query);
}