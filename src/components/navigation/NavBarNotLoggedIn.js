import React, { Component } from 'react';
import logo from '../../images/SmartBeans_logo_bw.svg';

export default class NavBarNotLoggedIn extends Component {
  state = {
    isActive: false,
    classActive: 'navbar-menu is-active',
    classInActive: 'navbar-menu',
  };

  render() {
    return (
      <div id="navbar">
        <nav
          className="navbar is-dark"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="navbar-item">
              <img src={logo} width="60" height="60" alt="" />
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
