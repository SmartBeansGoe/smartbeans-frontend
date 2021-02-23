import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LeaderboardItem extends Component {
  render() {
    return (
      <React.Fragment>
        <tr
          onClick={() => this.props.handleClick(this.props.index)}
          style={{
            cursor: 'pointer',
            backgroundColor:
              this.props.active === this.props.index
                ? 'rgba(162,204,226,0.3)'
                : '',
          }}
        >
          <td>{this.props.rank}</td>
          <td>{this.props.bean}</td>
          <td>{this.props.points}</td>
        </tr>
      </React.Fragment>
    );
  }
}

LeaderboardItem.propTypes = {
  index: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
  bean: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
};
