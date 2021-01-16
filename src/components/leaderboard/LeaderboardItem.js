import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LeaderboardItem extends Component {
  render() {
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.rank}</td>
          <td>{this.props.bean}</td>
          <td>{this.props.points}</td>
        </tr>
      </React.Fragment>
    );
  }
}

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  bean: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};
