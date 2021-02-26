import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExerciseListItem from './ExerciseListItem';

export default class ExerciseCategoryOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.DivRef = React.createRef();

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    // The height must be updated if the window size changes, therefore the Event Listener.
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      width: this.DivRef.current.offsetWidth,
    });
  }

  render() {
    const progress = this.props.exerciseList.filter((ex) => ex.solved === true);

    const exercises = this.props.exerciseList
      .sort(function (a, b) {
        if (a.shortname.charAt(0) !== b.shortname.charAt(0)) {
          let order = 'SEKXZ';
          return (
            order.indexOf(a.shortname.charAt(0)) -
            order.indexOf(b.shortname.charAt(0))
          );
        } else {
          return (
            parseInt(a.shortname.substring(1)) -
            parseInt(b.shortname.substring(1))
          );
        }
      })
      .sort((a, b) => (a.solved === b.solved ? 0 : !a.solved ? -1 : 1));

    return (
      <div ref={this.DivRef} className="tile is-child box ">
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
          <ul
            style={{
              listStyleType: 'none',
              marginLeft: '2.5em',
              paddingLeft: 0,
              position: 'relative',
            }}
          >
            {exercises.map((exercise) => {
              return (
                <ExerciseListItem
                  exercise={exercise}
                  width={this.state.width}
                />
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
