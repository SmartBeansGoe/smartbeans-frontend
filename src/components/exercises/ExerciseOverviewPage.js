import React, { Component } from 'react';
import ExerciseCategoryOverview from './ExerciseCategoryOverview';
import lang from '../../lang/de_DE.json';

const EASY = 'einfach';
const MEDIUM = 'mittel';
const HARD = 'schwierig';
const EXAM = 'klausur';

export default class ExerciseOverviewPage extends Component {
  render() {
    let exercises = this.props.exercises;
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
        title: lang['exercise.category.easy.title'],
        subtitle: lang['exercise.category.easy.subtitle'],
        exerciseList: bronze,
      },
      {
        title: lang['exercise.category.medium.title'],
        subtitle: lang['exercise.category.medium.subtitle'],
        exerciseList: silver,
      },
      {
        title: lang['exercise.category.hard.title'],
        subtitle: lang['exercise.category.hard.subtitle'],
        exerciseList: gold,
      },
      {
        title: lang['exercise.category.exam.title'],
        subtitle: lang['exercise.category.exam.subtitle'],
        exerciseList: platin,
      },
    ];

    return (
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
    );
  }
}
