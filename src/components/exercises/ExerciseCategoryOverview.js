import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export default class ExerciseCategoryOverview extends Component {
  render() {
    return (
      <div className="tile is-parent is-vertical">
        <div className="tile is-child box">
          <span className="icon is-small">
            <a className="fas fa-expand-arrows-alt" id="bronzeSeeMore"></a>
          </span>
          <div className="title">
            <p>
              {this.props.title}
            </p>
          </div>
          <p className="subtitle mb-0">{this.props.subtitle}</p>
          <div className="columns mt-0">
            <div className="column is-two-thirds pt-2">
              <progress className="progress is-success is-small pt-0" value={this.props.progressValue} max="100"></progress>
            </div>
            <div className="column is-hidden-mobile pt-0">
                0 / 0
            </div>
          </div>
          <div className="content">
            <ul>
              {this.props.exerciseList.map((e) => {
                return (
                  <li key={e.taskid}>
                    <Link to={"/exercises/" + e.taskid}>{e.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}


ExerciseCategoryOverview.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  progressValue: PropTypes.number.isRequired,
  exerciseList: PropTypes.array.isRequired,
}

