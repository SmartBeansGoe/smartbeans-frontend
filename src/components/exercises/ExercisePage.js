import React, { Component } from 'react'
import marked from 'marked'
import PropTypes from 'prop-types'
import axios_inst from '../../js/backend'
import { withRouter } from "react-router";

class ExercisePage extends Component {
  state = {
    title: "",
    task: "",
    solved: "",
  }

  componentDidMount() {
    this.getTask();
  }

  getTask() {
    const taskid = this.props.match.params.taskid;
    var exercise;
    for (let key in this.props.categories) {
      for (let i in this.props.categories[key].exerciseList) {
        let ex = this.props.categories[key].exerciseList[i];
        if (parseInt(ex.taskid) === parseInt(taskid)) {
          exercise = ex;
        }
      }
    }
    if (exercise !== undefined) {
      this.setState({
        title: exercise.name,
        task: exercise.task,
        solved: exercise.solved,
        taskid: exercise.taskid,
      })
    }
  }

  submitSolution() {
  }

  render() {
    return (
      <div className="tile is-parent is-10 is-vertical">
        <div className="tile is-child box" >
          <h1 className="title ml-3 mt-3">{ this.state.title }</h1>
          <p className="m-3" dangerouslySetInnerHTML={ {__html: marked(this.state.task)} }/>
        </div>
      </div>
    )
  }
}

ExercisePage.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default withRouter(ExercisePage);