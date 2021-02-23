import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Leaderboard from './Leaderboard';
import Bean from '../character/avatar/Bean';
import axios_inst from '../../js/backend';
import { DEFAULTFACE, DEFAULTSKINCOLOR } from '../../js/constants';

export default class LeaderboardPage extends Component {
  state = {
    leaderboards: [
      {
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
      },
    ],
  };

  componentDidMount() {
    this.getLeaderboards();
  }

  getLeaderboards() {
    // Laden lieber in der App js? dann müsste man bei namensänderung und bei abgabe von Aufgaben neu laden... ich fände es hier besser
    axios_inst.get('/leaderboard').then((response) => {
      // console.log('response', response.data);
      let rows = [];
      response.data.forEach((person) => {
        rows.push({
          rank: person.rank,
          bean: person.charname,
          points: person.score,
        });
      });
      // sortieren der Liste falls man nicht davon ausgehen kann das die List richtig ist
      rows.sort((a, b) => {
        if (a.rank - b.rank !== 0) {
          return a.rank - b.rank;
        } else {
          return a.points - b.points;
        }
      });
      // console.log('rows', rows);
      this.setState({
        leaderboards: [
          {
            title: 'Hall of Fame',
            description: 'Spieler mit den höchsten Leveln und Punkten',
            header: {
              rank: 'Rang',
              bean: 'Bohne',
              points: 'Punkte',
            },
            rows: rows,
          },
        ],
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.leaderboards.map((l) => (
          <Leaderboard
            key={l.title}
            title={l.title}
            description={l.description}
            header={l.header}
            rows={l.rows}
          />
        ))}
        <div className="tile is-vertical is-2 is-hidden-touch is-parent">
          <div className="tile is-child box" style={{ flex: 0 }}>
            <p className="title has-text-centered">{this.props.charname}</p>
            <Bean
              width="auto"
              height="auto"
              body_color={this.props.character.body_color}
              face_id={this.props.character.face_id}
              pants_id={this.props.character.pants_id}
              hat_id={this.props.character.hat_id}
              shirt_id={this.props.character.shirt_id}
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
