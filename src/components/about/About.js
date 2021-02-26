import React, { Component } from 'react';
import logo from '../../images/SmartBeans_logo_bw.svg';
import Team from './Team';
import lang from '../../lang/de_DE.json';
import Research from './Research';
import PrivacyPolicy from './PrivacyPolicy';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeam: true,
      isForschung: false,
      isData: false,
    };
  }

  clickHandler = (index) => {
    let isTeam = false;
    let isForschung = false;
    let isData = false;
    switch (index) {
      case 0:
        isTeam = true;
        break;
      case 1:
        isForschung = true;
        break;
      case 2:
        isData = true;
        break;
      default:
        isTeam = true;
    }
    this.setState({
      isTeam: isTeam,
      isForschung: isForschung,
      isData: isData,
    });
  };

  render() {
    return (
      <div className="tile is-parent is-vertical">
        <div className="tile is-child box">
          <p style={{ textAlign: 'center' }}>
            <img src={logo} width="140" height="140" alt="logo" />
          </p>
          <div className="tabs is-centered is-large">
            <ul>
              <li
                className={`${this.state.isTeam ? 'is-active' : ''}`}
                onClick={() => this.clickHandler(0)}
                style={{
                  width: '290px',
                }}
              >
                <a>{lang['about.team.title']}</a>
              </li>
              <li
                className={`${this.state.isForschung ? 'is-active' : ''}`}
                onClick={() => this.clickHandler(1)}
                style={{
                  width: '290px',
                }}
              >
                <a>{lang['about.research.title']}</a>
              </li>
              <li
                className={`${this.state.isData ? 'is-active' : ''}`}
                onClick={() => this.clickHandler(2)}
                style={{
                  width: '290px',
                }}
              >
                <a>{lang['about.privacy-policy.title']}</a>
              </li>
            </ul>
          </div>
          <div className="content container" style={{ width: '740px' }}>
            {this.state.isTeam && (
              <React.Fragment>
                <Team />
              </React.Fragment>
            )}
            {this.state.isForschung && (
              <React.Fragment>
                <Research />
              </React.Fragment>
            )}
            {this.state.isData && (
              <React.Fragment>
                <PrivacyPolicy />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
