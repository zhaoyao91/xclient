import RouteParser from 'route-parser';
import qs from 'querystringify';
import locationState from './location_state';

export default class Route {
  /**
   * @param path
   * @param options
   */
  constructor(path, options) {
    this._path = path;
    this._route = new RouteParser(path);
    this.options = options;
  }

  match(path) {
    if (this._path === '*') return {};
    else return this._route.match(path);
  }

  path(params, query) {
    const pathname = this._route.reverse(params);
    return pathname + qs.stringify(query, true);
  }

  go(params, query) {
    locationState.setPath(this.path(params, query));
  }
}
