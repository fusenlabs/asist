import React, { Component } from 'react';

export const Modal = ({ content, active, onClose }) => {
  const activeClass = active ? 'is-active' : '';
  return (
    <div className={ `modal ${activeClass}` }>
      <div className="modal-background"></div>
      <div className="modal-content">
        { content }
      </div>
      <button className="modal-close" onClick={ onClose }></button>
    </div>
  );
};
