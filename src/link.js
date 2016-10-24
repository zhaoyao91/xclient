import React from 'react';
import urlHelper from './url_helper';

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
      urlHelper.changeUrl(this.props.href);
    }
  }
}