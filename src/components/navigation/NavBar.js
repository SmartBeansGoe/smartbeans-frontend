import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/SmartBeans_logo_bw.svg';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  state = {
    isActiv: false,
    classActiv: 'navbar-menu is-active',
    classInActiv: 'navbar-menu',
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
                this.setState({ isActiv: !this.state.isActiv });
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
              this.state.isActiv
                ? this.state.classActiv
                : this.state.classInActiv
            }
          >
            <div className="navbar-start">
              <Link className="navbar-item is-hoverable" to="/exercises" onClick={() => { this.setState({ isActiv: false }) }}>
                Exercises
                </Link>
              <Link className="navbar-item is-hoverable" to="/leaderboard" onClick={() => { this.setState({ isActiv: false }) }}>
                Leaderboard
                </Link>
              <Link className="navbar-item is-hoverable" to="/statistics" onClick={() => { this.setState({ isActiv: false }) }}>
                Statistic
                </Link>
              <Link className="navbar-item is-hoverable" to="/character" onClick={() => { this.setState({ isActiv: false }) }}>
                Character
                </Link>
            </div>
            <div className="navbar-end">
              <article className="navbar-item">
                <p id="userbox">Eingeloggt als: {this.props.username}</p>
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
