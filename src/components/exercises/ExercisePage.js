import React, { Component } from 'react'
import marked from 'marked'
import axios_inst from '../../js/backend'

export default class ExercisePage extends Component {
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
    axios_inst.get("/tasks?id=" + taskid).then(
      res => {
        this.setState({
          title: res.data[0].name,
          task: res.data[0].task,
          solved: res.data[0].solved,
          taskid: res.data[0].taskid,
        })
      }
    );
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
