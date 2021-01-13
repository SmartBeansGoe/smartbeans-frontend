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
            <img src={logo} width="60" height="60" alt="" />
          </Link>
          <div className="navbar-start">
            <Link className="navbar-item is-hoverable" to="/exercises">
              Aufgaben
            </Link>
            <Link className="navbar-item is-hoverable" to="/leaderboard">
              Hall of Fame
            </Link>
            <Link className="navbar-item is-hoverable" to={"/users/" + this.props.username}>
              Profil
            </Link>
            <Link className="navbar-item is-hoverable" to="/character">
              Charakter
            </Link>
          </div>
        </div>
  
        <div className="navbar-menu">  
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