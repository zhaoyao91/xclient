import _ from 'lodash';

export default function(...composers) {
  return function(component) {
    return _.reduce(composers, (component, compose) => {
      return compose(component);
    }, component);
  }
}