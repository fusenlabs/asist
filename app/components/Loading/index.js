import React, { Component } from 'react';

const Loading = ({ isLoading }) => {
  const visibleClassName = isLoading ? 'show' : 'hide';
  return (
    <div className={`column loading has-text-centered ${visibleClassName}`}>
      <span className="icon rotating">
        <i className="fa fa-circle-o-notch"></i>
      </span>
    </div>
  );
};

export default Loading;
