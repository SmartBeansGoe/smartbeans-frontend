import React, { Component } from 'react';
import { BLUE } from '../../../js/constants';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SkillTag extends Component {
  render() {
    return (
      <Link
        style={{
          marginLeft: 4,
          backgroundColor: BLUE,
          color: 'whitesmoke',
          cursor: 'pointer',
        }}
        className="tag"
        to={'/exercises/category/' + this.props.skill}
      >
        {this.props.skill}
      </Link>
    );
  }
}

SkillTag.propTypes = {
  skill: PropTypes.string.isRequired,
};
