import React, { Component, PropTypes } from 'react';

import '!style!css!sass!./index.scss';

export default class Button extends Component {
  render() {
    return (<div
              className='button-component'
              onClick={() => {this.props.onSelect(this.props.name);}}>
              {this.props.name}
            </div>);
  }
}

Button.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
