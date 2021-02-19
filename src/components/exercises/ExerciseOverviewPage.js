import React, { Component } from 'react';
import ExerciseCategoryOverview from './ExerciseCategoryOverview';
import lang from '../../lang/de_DE.json';
import Bean from '../character/avatar/Bean';

export const EASY = 'einfach';
export const MEDIUM = 'mittel';
export const HARD = 'schwierig';
export const EXAM = 'klausur';

export function getExerciseByCategories(exercises) {
  var bronze = exercises.filter(function (el) {
    return el.difficulty === EASY;
  });
  var silver = exercises.filter(function (el) {
    return el.difficulty === MEDIUM;
  });
  var gold = exercises.filter(function (el) {
    return el.difficulty === HARD;
  });
  var platin = exercises.filter(function (el) {
    return el.difficulty === EXAM;
  });
  let categories = [
    {
      id: EASY,
      title: lang['exercise.category.easy.title'],
      subtitle: lang['exercise.category.easy.subtitle'],
      exerciseList: bronze,
    },
    {
      id: MEDIUM,
      title: lang['exercise.category.medium.title'],
      subtitle: lang['exercise.category.medium.subtitle'],
      exerciseList: silver,
    },
    {
      id: HARD,
      title: lang['exercise.category.hard.title'],
      subtitle: lang['exercise.category.hard.subtitle'],
      exerciseList: gold,
    },
    {
      id: EXAM,
      title: lang['exercise.category.exam.title'],
      subtitle: lang['exercise.category.exam.subtitle'],
      exerciseList: platin,
    },
  ];
  return categories;
}

export default class ExerciseOverviewPage extends Component {
  render() {
    let exercises = this.props.exercises;
    let categories = getExerciseByCategories(exercises);
    return (
      <React.Fragment>
        <div
          className="tile"
          style={{
            flexWrap: 'wrap',
          }}
        >
          {categories.map((c, index) => (
            <div
              key={index}
              className={
                'tile is-parent ' +
                (index % 2 === 0 ? 'flex-item-left' : 'flex-item-right')
              }
            >
              <ExerciseCategoryOverview
                key={index}
                id={index}
                title={c.title}
                subtitle={c.subtitle}
                exerciseList={c.exerciseList}
              />
            </div>
          ))}
        </div>
        <div className="tile is-vertical is-2 is-hidden-touch is-parent">
          <div className="tile is-child box" style={{ flex: 0 }}>
            <p className="title has-text-centered">{this.props.charname}</p>
            <Bean
              width="auto"
              height="auto"
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
