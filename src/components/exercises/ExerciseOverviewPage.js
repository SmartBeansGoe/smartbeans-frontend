import React, { Component } from 'react'
import axios_inst from '../../js/backend'
import ExerciseCategoryOverview from './ExerciseCategoryOverview'

export default class ExerciseOverviewPage extends Component {
  /*
  state = {
    categories: [
      {
        title: "Bronze",
        subtitle: "Basis Aufgaben",
        progressValue: 0,
        exerciseList: [],
      },
      {
        title: "Silver",
        subtitle: "Einsteiger Aufgaben",
        progressValue: 0,
        exerciseList: [],
      },
      {
        title: "Gold",
        subtitle: "Fortgeschrittenen Aufgaben",
        progressValue: 0,
        exerciseList: [],
      },
      {
        title: "Platin",
        subtitle: "Klausurniveau Aufgaben",
        progressValue: 0,
        exerciseList: [],
      },
      {
        title: "Diamond",
        subtitle: "Overkill Aufgaben",
        progressValue: 0,
        exerciseList: [],
      },
    ]
  }

  componentDidMount() {
    this.getExercisesByCategory();
  }


  getExercisesByCategory() {
    axios_inst.get("/tasks").then(res => {
      var bronze = res.data.filter(function (el) {
        return el.shortname[0] === "X";
      });
      var silver = res.data.filter(function (el) {
        return el.shortname[0] === "E";
      });
      var gold = res.data.filter(function (el) {
        return el.shortname[0] === "S";
      });
      var platin = res.data.filter(function (el) {
        return el.shortname[0] === "Z";
      });
      var diamond = res.data.filter(function (el) {
        return el.shortname[0] === "K";
      });
      this.setState({
        categories: [
          {
            title: "Bronze",
            subtitle: "Basis Aufgaben",
            progressValue: 0,
            exerciseList: bronze,
          },
          {
            title: "Silver",
            subtitle: "Einsteiger Aufgaben",
            progressValue: 0,
            exerciseList: silver,
          },
          {
            title: "Gold",
            subtitle: "Fortgeschrittenen Aufgaben",
            progressValue: 0,
            exerciseList: gold,
          },
          {
            title: "Platin",
            subtitle: "Klausurniveau Aufgaben",
            progressValue: 0,
            exerciseList: platin,
          },
          {
            title: "Diamond",
            subtitle: "Overkill Aufgaben",
            progressValue: 0,
            exerciseList: diamond,
          },
        ]
  
      })
    });
  };
  */

  render() {
    return (
      <React.Fragment>
        {this.props.categories.map((c) => (
          <ExerciseCategoryOverview
            key={c.title}
            title={c.title}
            subtitle={c.subtitle}
            progressValue={c.progressValue}
            exerciseList={c.exerciseList}
          />
        ))}
      </React.Fragment>
    )
  }
}
