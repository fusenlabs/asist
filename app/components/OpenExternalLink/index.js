import React, { Component } from 'react';

const OpenExternalLink = ({ link }) => {
  return (
    <a href={link} target="_blank" className="level-item level-right" style={{ maxWidth: 20 }}>
      <span className="icon">
        <i className="fa fa-external-link-square"></i>
      </span>
    </a>
  );
};

export default OpenExternalLink;
