import Route from './route';
import qs from 'querystringify';
import locationState from './location_state';

export default class Router {
  constructor(routes = []) {
    this.routes = routes;
  }

  route(id, path, options) {
    this.routes[ id ] = new Route(path, options);
  }

  setRoute(id, route) {
    this.routes[ id ] = route;
  }

  setRoutes(routes) {
    this.routes = routes;
  }

  match(path) {
    return this._findOne((id, route) => {
      const params = route.match(path);
      if (params) return { id, route, params };
    })
  }

  path(id, params, query) {
    const route = this.routes[ id ];
    if (route) return route.path(params, query);
    else return id + qs.stringify(query, true);
  }

  go(id, params, query) {
    const path = this.path(id, params, query);
    locationState.setPath(path);
  }

  current() {
    return this.match(location.pathname);
  }

  _findOne(callback) {
    for (let id in this.routes) {
      if (this.routes.hasOwnProperty(id)) {
        const route = this.routes[ id ];
        const result = callback(id, route);
        if (result) return result;
      }
    }
  }
}