import React, { Component } from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container level">
        <div className="level-left animated fadeInUp">
          <p>made by <a href="https://github.com/fusenlabs" target="_blank">FūsenLabs</a> in C&oacute;rdoba, Argentina</p>
        </div>
        <div className="level-right animated fadeInUp">
          <a href="https://github.com/fusenlabs/asist" target="_blank">
            <span className="icon">
              <i className="fa fa-github"></i>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
