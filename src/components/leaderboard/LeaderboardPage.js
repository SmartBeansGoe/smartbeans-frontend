import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Leaderboard from './Leaderboard';
import Bean from '../character/avatar/Bean';
import axios_inst from '../../js/backend';
import { DEFAULTFACE, DEFAULTSKINCOLOR } from '../../js/constants';
import lang from '../../lang/de_DE.json';

export default class LeaderboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: lang['leaderboard.title'],
      header: {
        rank: lang['leaderboard.header.rank'],
        bean: lang['leaderboard.header.bean'],
        points: lang['leaderboard.header.points'],
      },
      rows: [],
      character: {
        body_color: DEFAULTSKINCOLOR,
        shirt_id: '',
        face_id: DEFAULTFACE,
        pants_id: '',
        hat_id: '',
      },
      rawData: [],
      charname: '',
      active: 0,
      intervalId: 0,
    };
    this.setActive = this.setActive.bind(this);
  }

  componentDidMount() {
    this.getLeaderboard();
    this.startInterval();
    this.setState({
      character: {
        body_color: this.props.character.body_color,
        face_id: this.props.character.face_id,
        pants_id: this.props.character.pants_id,
        hat_id: this.props.character.hat_id,
        shirt_id: this.props.character.shirt_id,
      },
      charname: this.props.charname,
    });
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  setActive(index) {
    let bean = this.state.rawData[index];
    this.setState({
      character: {
        body_color:
          bean.character.body_color === null
            ? DEFAULTSKINCOLOR
            : bean.character.body_color,
        face_id:
          bean.character.face_id === null
            ? DEFAULTFACE
            : bean.character.face_id,
        pants_id: bean.character.pants_id,
        hat_id: bean.character.hat_id,
        shirt_id: bean.character.shirt_id,
      },
      charname: bean.charname,
      active: index,
    });
  }

  getLeaderboard() {
    axios_inst
      .get('/leaderboard')
      .then((response) => {
        let rows = [];
        let active = -1;

        let prev = 0;
        response.data.forEach((person, index) => {
          if (person.score > 0) {
            if (person.character.username !== null) active = index;
            rows.push({
              rank: person.rank !== prev ? index + 1 : '', // Harder rank: 1 1 2 2 3 -> 1 (1) 3 (3) 5
              bean: person.charname,
              points: person.score,
            });
            prev = person.rank;
          }
        });
        if (active === -1) {
          active = 0;
        }
        this.setState(
          {
            rows: rows,
            rawData: response.data,
            active: active,
          },
          () => this.setActive(active)
        );
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  startInterval() {
    const intervalId = setInterval(() => {
      this.getLeaderboard();
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
      <React.Fragment>
        <Leaderboard
          title={this.state.title}
          header={this.state.header}
          rows={this.state.rows}
          handleClick={this.setActive}
          active={this.state.active}
        />
        <div className="tile is-vertical is-2 is-hidden-touch is-parent">
          <div className="tile is-child box" style={{ flex: 0 }}>
            <p className="title has-text-centered">{this.state.charname}</p>
            <Bean
              body_color={this.state.character.body_color}
              face_id={this.state.character.face_id}
              pants_id={this.state.character.pants_id}
              hat_id={this.state.character.hat_id}
              shirt_id={this.state.character.shirt_id}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

LeaderboardPage.propTypes = {
  charname: PropTypes.string.isRequired,
  character: PropTypes.object.isRequired,
};
