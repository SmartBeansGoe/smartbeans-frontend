import React, { Component } from 'react';
import ExerciseCategoryOverview from './ExerciseCategoryOverview';

export default class ExerciseOverviewPage extends Component {
  render() {
    return (
      <div className="tile" style={{
        flexWrap: "wrap"
      }}>
        {this.props.categories.map((c, index) => (
          <div
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
