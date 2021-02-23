import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/SmartBeans_logo_bw.svg';
import { Link } from 'react-router-dom';
import lang from '../../lang/de_DE.json';
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';
import { logout } from '../../js/cookie';
import ProblemModal from '../ProblemModal';

export default class NavBar extends Component {
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
              {this.props.level < 5 ? (
                <article
                  title={lang['navigation.locked']}
                  className="navbar-item"
                  style={{
                    cursor: 'not-allowed',
                    color: 'rgb(203, 192, 192)',
                  }}
                >
                  <p>{lang['navigation.leaderboard']}</p>
                </article>
              ) : (
              <Link
                  className="navbar-item is-hoverable disabled-link is-primary"
                to="/leaderboard"
                  onClick={(e) => {
                  this.setState({ isActive: false });
                }}
              >
                {lang['navigation.leaderboard']}
              </Link>
              )}
              <Link
                className="navbar-item is-hoverable"
                to="/about"
                onClick={() => {
                  this.setState({ isActive: false });
                }}
              >
                {lang['navigation.about']}
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <ProblemModal username={this.props.username} />
              </div>
              <article className="navbar-item">
                <p>
                  {lang['navigation.logged-in-as']}: {this.props.username}
                </p>
                <a title={lang['navigation.logout']} onClick={() => logout()}>
                  <Icon
                    path={mdiLogout}
                    size={1.2}
                    style={{
                      color: this.state.isActive ? 'black' : 'white',
                      paddingTop: 5,
                      marginLeft: 5,
                    }}
                  />
                </a>
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
  level: PropTypes.number.isRequired,
};
