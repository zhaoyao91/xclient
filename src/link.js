import React from 'react';
import locationState from './location_state';

export default class Link extends React.Component {
  render() {
    return <a {...this.props} onClick={this.onClick.bind(this)}/>
  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    else if (this.props.href) {
      e.preventDefault();
      locationState.setPath(this.props.href)
    }
  }
}