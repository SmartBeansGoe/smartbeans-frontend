import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Leaderboard from './Leaderboard';
import Bean from '../character/avatar/Bean';

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
    // Dummy state
    // Axios will look up these.

    this.setState({
      leaderboards: [
        {
          title: 'Meister der Möglichkeiten',
          description: 'Verwende die meisten if-Abfragen in einer Aufgabe',
          header: {
            rank: 'Rang',
            bean: 'Bohne',
            points: 'Anzahl',
          },
          rows: [
            {
              rank: 1,
              bean: 'Trollbob_100',
              points: 70,
            },
            {
              rank: 2,
              bean: 'DieLiese71',
              points: 65,
            },
            {
              rank: 3,
              bean: 'MarkusHerold',
              points: 62,
            },
            {
              rank: 4,
              bean: 'DerKleineJonas',
              points: 61,
            },
            {
              rank: 5,
              bean: 'Nico',
              points: 59,
            },
          ],
        },
      ],
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