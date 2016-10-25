import locationState from './location_state';
import React from 'react';

export default function(mapper) {
  if (!mapper) {
    mapper = (state) => {
      return { location: state }
    };
  }
  else if (typeof mapper === 'string') {
    mapper = (state) => {
      return { [mapper]: state }
    }
  }
  else if (typeof mapper === 'object') {
    const map = mapper;
    mapper = (state) => {
      return _.mapValues(map, (value, key) => _.get(state, value || key))
    }
  }
  return function(Component) {
    return class LocationProvider extends React.Component {
      state = {
        location: {
          path: locationState.getPath(),
          pathname: locationState.getPathname(),
          query: locationState.getQuery(),
        }
      };

      componentWillMount() {
        this._id = locationState.subscribe((state)=> {
          this.setState({ location: state });
        })
      }

      componentWillUnmount() {
        locationState.unsubscribe(this._id);
      }

      render() {
        const { location } = this.state;
        const locationProps = mapper(location);
        return <Component {...locationProps} {...this.props}/>
      }
    }
  }
}