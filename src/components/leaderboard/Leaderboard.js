import React, { Component } from 'react';
import PropTypes from 'prop-types';
import leaderboard_graphic from './images/leaderboard_graphic.svg';
import LeaderboardItem from './LeaderboardItem';

export default class Leaderboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="tile is-parent">
          <div className="tile is-child box">
            <div className="container" style={{ maxWidth: '900px' }}>
              <p className="title has-text-centered">{this.props.title}</p>
              <p className="has-text-centered">
                <img
                  src={leaderboard_graphic}
                  width="150"
                  height="150"
                  alt="Badge"
                />
              </p>
              <table className="table is-fullwidth is-hoverable has-text-centered">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: '25%',
                      }}
                    >
                      {this.props.header.rank}
                    </th>
                    <th
                      style={{
                        width: '50%',
                      }}
                    >
                      {this.props.header.bean}
                    </th>
                    <th
                      style={{
                        width: '25%',
                      }}
                    >
                      {this.props.header.points}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.rows.map((row, index) => (
                    <LeaderboardItem
                      key={row.bean + index}
                      index={index}
                      rank={row.rank}
                      bean={row.bean}
                      points={row.points}
                      handleClick={this.props.handleClick}
                      active={this.props.active}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Leaderboard.propTypes = {
  title: PropTypes.string.isRequired,
  header: PropTypes.exact({
    rank: PropTypes.string.isRequired,
    bean: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  }),
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      rank: PropTypes.number.isRequired,
      bean: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.number,
};
