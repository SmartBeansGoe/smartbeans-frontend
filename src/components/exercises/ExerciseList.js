import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExerciseListItem from './ExerciseListItem';

export default class ExerciseList extends Component {
  render() {
    return (
      <ul
        style={{
          listStyleType: 'none',
          marginLeft: '2.5em',
          paddingLeft: 0,
          position: 'relative',
        }}
      >
        {this.props.exercises.map((exercise) => {
          return (
            <ExerciseListItem
              key={exercise.taskid + '_exerciseItem'}
              exercise={exercise}
            />
          );
        })}
      </ul>
    );
  }
}

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
};
