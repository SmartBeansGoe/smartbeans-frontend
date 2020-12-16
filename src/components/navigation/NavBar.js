import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../../images/SmartBeans_logo_bw.svg'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

  render() {
    return (
      <div>
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={logo} width="60" height="60" />
          </Link>
        </div>
  
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item is-hoverable" to="/exercises">
              Exercises
            </Link>
            <Link className="navbar-item is-hoverable" to="/leaderboard">
              Leaderboard
            </Link>
            <Link className="navbar-item is-hoverable" to="/statistics">
              Statistik
            </Link>
          </div>
  
          <div className="navbar-end">
            <article className="navbar-item">
            <p id="userbox">
              Eingeloggt als: {this.props.username}
            </p>
            </article>
          </div>
        </div>
        </nav>
      </div>
    )
  }
}

NavBar.propTypes = {
  username: PropTypes.string.isRequired,
}