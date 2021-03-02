import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/SmartBeans_logo_bw.svg';
import { Link } from 'react-router-dom';
import lang from '../../lang/de_DE.json';
import Icon from '@mdi/react';
import { mdiLogout, mdiAlertDecagram } from '@mdi/js';
import { logout } from '../../js/cookie';
import ProblemModal from '../ProblemModal';
import { LEADERBOARD_UNLOCK } from '../../js/constants';
import LeaderboardBlockedModal from '../leaderboard/LeaderboardBlockedModal';
import axios_inst from '../../js/backend';
import './NavBar.css';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.showLeaderboardBlockedModal = this.showLeaderboardBlockedModal.bind(
      this
    );
  }
  state = {
    isActive: false,
    classActive: 'navbar-menu is-active',
    classInActive: 'navbar-menu',
    leaderboardModalActive: false,
    errorMessages: [],
    intervalId: null,
  };

  showLeaderboardBlockedModal() {
    this.setState({
      leaderboardModalActive: !this.state.leaderboardModalActive,
    });
  }

  componentDidMount() {
    this.getErrorMessages();
    this.startInterval();
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  getErrorMessages() {
    axios_inst
      .get('/error_notifications')
      .then((res) => {
        this.setState({
          errorMessages: res.data,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  startInterval() {
    const intervalId = setInterval(() => {
      this.getErrorMessages();
    }, 30000);
    this.setState({
      intervalId: intervalId,
    });
  }

  stopInterval() {
    clearInterval(this.state.intervalId);
  }

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
              className={`navbar-burger ${
                this.state.isActive ? 'is-active' : ''
              }`}
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
              {this.props.level < LEADERBOARD_UNLOCK ? (
                <React.Fragment>
                  <article
                    title={lang['navigation.locked']}
                    className="navbar-item"
                    style={{
                      cursor: 'not-allowed',
                      color: 'rgb(203, 192, 192)',
                    }}
                    onClick={() => this.showLeaderboardBlockedModal()}
                  >
                    <p>{lang['navigation.leaderboard']}</p>
                  </article>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link
                    className="navbar-item is-hoverable disabled-link is-primary"
                    to="/leaderboard"
                    onClick={(e) => {
                      this.setState({ isActive: false });
                    }}
                  >
                    {lang['navigation.leaderboard']}
                  </Link>
                </React.Fragment>
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
              {this.state.errorMessages.length !== 0 && (
                <div className="navbar-item pb-0">
                  <div className="dropdown  is-hoverable">
                    <div className="dropdown-trigger">
                      <span className="icon is-medium">
                        <svg viewBox="0 0 10 10" style={{ top: '0px' }}>
                          <Icon
                            className="icon-color-change"
                            path={mdiAlertDecagram}
                            size={1}
                            style={{
                              paddingTop: 5,
                              marginLeft: 5,
                            }}
                          />
                        </svg>
                      </span>
                    </div>
                    <div
                      className="dropdown-menu  pt-4"
                      role="menu"
                      style={{ width: '400px' }}
                    >
                      {this.state.errorMessages.map((errorMessage, index) => {
                        return (
                          <article
                            className="message is-dark"
                            style={{
                              boxShadow: ' 0 0 15px 5px rgba(10, 10, 10, 0.7)',
                            }}
                            key={index + errorMessage.title}
                          >
                            <div className="message-body">
                              <h5 className="subtitle">{errorMessage.title}</h5>
                              {errorMessage.content}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
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
        <LeaderboardBlockedModal
          modalState={this.state.leaderboardModalActive}
          closeModal={this.showLeaderboardBlockedModal}
        />
      </div>
    );
  }
}

NavBar.propTypes = {
  username: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};
