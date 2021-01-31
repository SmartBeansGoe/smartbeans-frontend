import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCheck, mdiCheckBold } from '@mdi/js';
import { BLUE } from '../../js/constants';

export default class ExerciseCategoryOverview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const progress = this.props.exerciseList.filter((ex) => ex.solved === true);

    const exercises = this.props.exerciseList
      .sort(function (a, b) {
        return a.name.localeCompare(b.name);
      })
      .sort((a, b) => (a.solved === b.solved ? 0 : !a.solved ? -1 : 1));

    return (
      <div className="tile is-child box ">
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
          <ul>
            {exercises.map((e) => {
              return (
                <li key={e.taskid}>
                  <Link
                    className={e.solved ? 'has-text-smart' : 'has-text-grey'}
                    to={{
                      pathname: '/exercises/' + e.taskid,
                      state: { task: e },
                    }}
                  >
                    {e.name}
                    {'  '}
                    {e.solved ? (
                      <Icon
                        path={mdiCheckBold}
                        size={0.7}
                        style={{ color: BLUE }}
                      />
                    ) : null}
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
