import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Leaderboard from './Leaderboard';
import Bean from '../character/avatar/Bean';
import axios_inst from '../../js/backend';
import { DEFAULTFACE, DEFAULTSKINCOLOR } from '../../js/constants';

export default class LeaderboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      header: {
        rank: '',
        bean: '',
        points: '',
      },
      rows: [
        {
          rank: 1,
          bean: '',
          points: 0,
        },
      ],
      character: {
        body_color: DEFAULTSKINCOLOR,
        shirt_id: '',
        face_id: DEFAULTFACE,
        pants_id: '',
        hat_id: '',
      },
      rawData: [],
      charname: '',
      active: -1,
      intervalId: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getLeaderboards();
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

  handleClick(index) {
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

  getLeaderboards() {
    axios_inst.get('/leaderboard').then((response) => {
      let rows = [];
      let active;
      response.data.forEach((person, index) => {
        if (this.props.username === person.character.username) active = index;
        rows.push({
          rank: person.rank,
          bean: person.charname,
          points: person.score,
        });
      });
      if (this.state.active !== -1) active = this.state.active;
      this.setState({
        title: 'Hall of Fame',
        description: 'Spieler mit den höchsten Leveln und Punkten',
        header: {
          rank: 'Rang',
          bean: 'Bohne',
          points: 'Punkte',
        },
        rows: rows,
        rawData: response.data,
        active: active,
      });
    });
  }

  startInterval() {
    const intervalId = setInterval(() => {
      this.getLeaderboards();
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
          description={this.state.description}
          header={this.state.header}
          rows={this.state.rows}
          handleClick={this.handleClick}
          active={this.state.active}
        />
        <div className="tile is-vertical is-2 is-hidden-touch is-parent">
          <div className="tile is-child box" style={{ flex: 0 }}>
            <p className="title has-text-centered">{this.state.charname}</p>
            <Bean
              width="auto"
              height="auto"
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
  username: PropTypes.string.isRequired,
};
