import React, { Component, PropTypes } from 'react';

import '!style!css!sass!./index.scss';

class Loading extends Component {
  render() {
    return (<span className='loading-component'>
              {this.props.show ? 'LoAdInG!...' : ''}
            </span>);
  }
}

export default Loading;
