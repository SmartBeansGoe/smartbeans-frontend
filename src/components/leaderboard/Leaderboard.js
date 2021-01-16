import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mockup_badge from './images/mockup_badge.svg';
import LeaderboardItem from './LeaderboardItem';

export default class Leaderboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="tile is-parent">
          <div className="tile is-child box">
            <p className="title has-text-centered">{this.props.title}</p>
            <p className="has-text-centered">
              <img src={mockup_badge} width="150" height="150" alt="Badge" />
            </p>
            <p className="has-text-centered has-background-primary-light">
              {this.props.description}
            </p>
            <table className="table is-fullwidth is-hoverable has-text-centered">
              <thead>
                <tr>
                  <th>{this.props.header.rank}</th>
                  <th>{this.props.header.bean}</th>
                  <th>{this.props.header.points}</th>
                </tr>
              </thead>
              <tbody>
                {this.props.rows.map((row) => (
                  <LeaderboardItem
                    key={row.rank}
                    rank={row.rank}
                    bean={row.bean}
                    points={row.points}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Leaderboard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  header: {
    rank: PropTypes.string.isRequired,
    bean: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  },
  rows: [
    {
      rank: PropTypes.number.isRequired,
      bean: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    },
  ],
};
