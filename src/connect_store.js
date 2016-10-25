import React from 'react';
import _ from 'lodash';

export default function(store) {
  return function(mapper) {
    if (!mapper) {
      mapper = (newState, oldState) => {
        return { state: newState }
      };
    }
    else if (typeof mapper === 'string') {
      mapper = (newState, oldState) => {
        return { [mapper]: newState }
      }
    }
    else if (typeof mapper === 'object') {
      const map = mapper;
      mapper = (newState, oldState) => {
        return _.mapValues(map, (value, key) => _.get(newState, value || key))
      }
    }
    return function(Component) {
      return class StateProvider extends React.Component {
        state = {
          oldState: store.get(),
          newState: store.get()
        };

        componentWillMount() {
          this._id = store.subscribe((newState, oldState) => {
            this.setState({ newState, oldState });
          })
        }

        componentWillUnmount() {
          store.unsubscribe(this._id);
        }

        render() {
          return <Component {...this.getProps()}/>
        }

        getProps() {
          const { newState, oldState } = this.state;
          const state = mapper(newState, oldState);
          return Object.assign({}, state, this.props);
        }
      }
    }
  }
}