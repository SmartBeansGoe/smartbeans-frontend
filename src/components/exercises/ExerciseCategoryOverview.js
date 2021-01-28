import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ExerciseCategoryOverview extends Component {
  render() {
    const progress = this.props.exerciseList.filter((ex) => ex.solved === true);

    return (
      <div className="tile is-child box ">
        <div className="title">
          <p>{this.props.title}</p>
        </div>
        <p className="subtitle mb-0">{this.props.subtitle}</p>
        <div className="columns mt-0">
          <div className="column is-two-thirds pt-2">
            <progress
              className="progress is-success is-small pt-0"
              value={progress.length}
              max={this.props.exerciseList.length}
            />
          </div>
          <div className="column is-hidden-mobile pt-0">
            {progress.length} / {this.props.exerciseList.length}
          </div>
        </div>
        <div className="content">
          <ul>
            {this.props.exerciseList.map((e) => {
              return (
                <li key={e.taskid}>
                  <Link
                    className={e.solved ? 'has-text-success' : 'has-text-grey'}
                    to={{
                      pathname: '/exercises/' + e.taskid,
                      state: { task: e },
                    }}
                  >
                    {e.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

ExerciseCategoryOverview.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  exerciseList: PropTypes.array.isRequired,
};
