import React from 'react';
import _ from 'lodash';

export default function(...args) {
  let props;
  let deep = false;
  if (args && args.length > 0) {
    if (_.isBoolean(_.last(args))) {
      props = _.initial(args);
      deep = _.last(args);
    }
    else props = args;
  }

  let shouldUpdate;
  if (props) {
    if (deep) {
      shouldUpdate = function(oldProps, newProps) {
        oldProps = _.pick(oldProps, props);
        newProps = _.pick(newProps, props);
        return !_.isEqual(oldProps, newProps);
      }
    }
    else {
      shouldUpdate = function(oldProps, newProps) {
        oldProps = _.pick(oldProps, props);
        newProps = _.pick(newProps, props);
        return !shallowEqual(oldProps, newProps);
      }
    }
  }
  else {
    if (deep) {
      shouldUpdate = function(oldProps, newProps) {
        return !_.isEqual(oldProps, newProps);
      }
    }
    else {
      shouldUpdate = function(oldProps, newProps) {
        return !shallowEqual(oldProps, newProps);
      }
    }
  }

  return function(Component) {
    return class UpdateByProps extends React.Component {
      shouldComponentUpdate(nextProps, nextState) {
        return shouldUpdate(this.props, nextProps);
      }

      render() {
        return <Component {...this.props}/>
      }
    }
  }
}

function shallowEqual(a, b) {
  for(var key in a) {
    if(!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for(var key in b) {
    if(!(key in a) || a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}