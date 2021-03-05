import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ExerciseCategoryOverview from './ExerciseCategoryOverview';
import lang from '../../../lang/de_DE.json';
import Bean from '../../character/avatar/Bean';

function getExerciseByCategory(exercises, category) {
  return exercises.filter((el) => el.categories.includes(category));
}

class ExerciseCategoryPage extends Component {
  render() {
    console.log(this.props);
    let all_exercises = this.props.exercises;
    let category = this.props.match.params.category;
    let exercises = getExerciseByCategory(all_exercises, category);
    return (
      <React.Fragment>
        <div
          className="tile"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <div className={'tile is-parent'}>
            <ExerciseCategoryOverview
              title={category}
              subtitle={
                lang['exercise.category.overview.part-A'] +
                category +
                lang['exercise.category.overview.part-B']
              }
              exerciseList={exercises}
            />
          </div>
        </div>
        <div className="tile is-vertical is-2 is-hidden-touch is-parent">
          <div className="tile is-child box" style={{ flex: 0 }}>
            <p className="title has-text-centered">{this.props.charname}</p>
            <Bean
              body_color={this.props.character.body_color}
              face_id={this.props.character.face_id}
              pants_id={this.props.character.pants_id}
              hat_id={this.props.character.hat_id}
              shirt_id={this.props.character.shirt_id}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ExerciseCategoryPage);

ExerciseCategoryPage.propTypes = {
  exercises: PropTypes.array.isRequired,
  charname: PropTypes.string.isRequired,
  character: PropTypes.object.isRequired,
};
