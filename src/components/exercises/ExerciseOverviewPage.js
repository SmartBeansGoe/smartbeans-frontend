import React, { Component } from 'react';
import ExerciseCategoryOverview from './ExerciseCategoryOverview';

export default class ExerciseOverviewPage extends Component {
  render() {
    let exercises = this.props.exercises;
    var bronze = exercises.filter(function (el) {
      return el.difficulty === 'einfach';
    });
    var silver = exercises.filter(function (el) {
      return el.difficulty === 'mittel';
    });
    var gold = exercises.filter(function (el) {
      return el.difficulty === 'schwierig';
    });
    var platin = exercises.filter(function (el) {
      return el.difficulty === 'klausur';
    });
    let categories = [
      {
        title: 'Bronze',
        subtitle: 'Basis Aufgaben',
        exerciseList: bronze,
      },
      {
        title: 'Silver',
        subtitle: 'Einsteiger Aufgaben',
        exerciseList: silver,
      },
      {
        title: 'Gold',
        subtitle: 'Fortgeschrittenen Aufgaben',
        exerciseList: gold,
      },
      {
        title: 'Platin',
        subtitle: 'Klausurniveau Aufgaben',
        exerciseList: platin,
      },
    ];

    return (
      <div className="tile is-parent is-vertical">
        {categories.map((c, index) => (
          <ExerciseCategoryOverview
            key={index}
            id={index}
            title={c.title}
            subtitle={c.subtitle}
            exerciseList={c.exerciseList}
          />
        ))}
      </div>
    );
  }
}
