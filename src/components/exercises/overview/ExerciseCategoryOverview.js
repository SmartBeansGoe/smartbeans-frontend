import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExerciseList from './ExerciseList';

export default class ExerciseCategoryOverview extends Component {
  render() {
    const progress = this.props.exerciseList.filter((ex) => ex.solved === true);

    const exercises = this.props.exerciseList
      .sort(function (a, b) {
        return a.order - b.order;
      })
      .sort((a, b) => (a.solved === b.solved ? 0 : !a.solved ? -1 : 1));

    return (
      <div className="tile is-child box">
        <div className="title">
          <p>{this.props.title}</p>
        </div>
        <p className="subtitle mb-0">{this.props.subtitle}</p>
        <div className="columns mt-0">
          <div className="column is-two-thirds pt-2">
            <progress
              className="progress is-small pt-0 is-smart"
              value={progress.length}
              max={this.props.exerciseList.length}
            />
          </div>
          <div className="column is-hidden-mobile pt-0">
            {progress.length} / {this.props.exerciseList.length}
          </div>
        </div>
        <div className="content">
          <ExerciseList exercises={exercises} hasTags={this.props.hasTags} />
        </div>
      </div>
    );
  }
}

ExerciseCategoryOverview.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  exerciseList: PropTypes.array.isRequired,
  hasTags: PropTypes.bool.isRequired,
};
