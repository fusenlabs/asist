import React, { Component } from 'react';

const Checkbox = ({ checked, animated }) => {
  // if item is being removed stop animation of checkbox by this.props.animated
  const checkedClassName = checked ? 'fadeIn' : 'fadeOut';
  const uncheckedClassName = !checked ? 'fadeIn' : 'fadeOut';
  const animatedClassName = animated ? 'animated' : '';
  return (
    <span className="icon level-item level-left">
      <i className={`fa fa-check-square-o ${animatedClassName} ${checkedClassName}`}></i>
      <i className={`fa fa-square-o animated ${uncheckedClassName}`}></i>
    </span>
  );
};

export default Checkbox;
