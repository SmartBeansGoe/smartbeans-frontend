import React, { Component } from 'react'
import axios_inst from '../../js/backend'
import ExerciseCategoryOverview from './ExerciseCategoryOverview'

export default class ExerciseOverviewPage extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.categories.map((c, index) => (
          <ExerciseCategoryOverview
            key={index}
            id={index}
            title={c.title}
            subtitle={c.subtitle}
            exerciseList={c.exerciseList}
          />
        ))}
      </React.Fragment>
    )
  }
}
