import React, { Component } from 'react';
import ExerciseCategoryOverview from './ExerciseCategoryOverview';

export default class ExerciseOverviewPage extends Component {
  render() {
    return (
      <div className="tile is-parent is-vertical">
        {this.props.categories.map((c, index) => (
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
