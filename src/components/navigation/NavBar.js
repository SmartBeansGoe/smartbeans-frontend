import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/SmartBeans_logo_bw.svg';
import { Link } from 'react-router-dom';
import lang from '../../lang/de_DE.json';

export default class NavBar extends Component {
  state = {
    isActive: false,
    classActive: 'navbar-menu is-active',
    classInActive: 'navbar-menu',
  };

  render() {
    return (
      <div>
        <nav
          className="navbar is-dark"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img src={logo} width="60" height="60" alt="" />
            </Link>
            <a
              role="button"
              onClick={() => {
                this.setState({ isActive: !this.state.isActive });
              }}
              className="navbar-burger"
              data-target="navMenu"
              aria-label="menu"
              aria-expanded="false"
              id="burger"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div
            className={
              this.state.isActive
                ? this.state.classActive
                : this.state.classInActive
            }
          >
            <div className="navbar-start">
              <Link
                className="navbar-item is-hoverable"
                to="/"
                onClick={() => {
                  this.setState({ isActive: false });
                }}
              >
                {lang['navigation.dashboard']}
              </Link>
              <Link
                className="navbar-item is-hoverable"
                to="/exercises"
                onClick={() => {
                  this.setState({ isActive: false });
                }}
              >
                {lang['navigation.exercises']}
              </Link>
              <Link
                className="navbar-item is-hoverable"
                to="/leaderboard"
                onClick={() => {
                  this.setState({ isActiv: false });
                }}
              >
                {lang['navigation.leaderboard']}
              </Link>
            </div>
            <div className="navbar-end">
              <article className="navbar-item">
                <p id="userbox">
                  {lang['navigation.logged-in-as']}: {this.props.username}
                </p>
              </article>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  username: PropTypes.string.isRequired,
};
