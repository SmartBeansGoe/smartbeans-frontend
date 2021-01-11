import React, { Component } from 'react'
import marked from 'marked'
import axios_inst from '../../js/backend'
import SubmissionOverview from './SubmissionOverview'
import { withRouter } from "react-router";
import { mdiUpload } from '@mdi/js';
import { Icon } from '@mdi/react';

class ExercisePage extends Component {
  state = {
    title: "",
    task: "",
    solved: "",
    submissions: [],
    fileName: "Keine Datei ausgewählt",
    selectedFile: null,
  }

  componentDidMount() {
    this.getTask();
    this.getSubmissions();
  }

  getTask() {
    if (this.props.location.state === undefined) {
      this.loadTask();
    } else {
      this.addTaskToState(this.props.location.state.task);
    }
  }

  loadTask() {
    let taskid = this.props.match.params.taskid;
    axios_inst.get(`/tasks?id=${taskid}`).then(res => {
      let task = res.data[0];
      this.addTaskToState(task);
    });
  }

  addTaskToState(exercise) {
    this.setState({
      title: exercise.name,
      task: exercise.task,
      solved: exercise.solved,
      taskid: exercise.taskid,
    })
  }

  getSubmissions() {
    let taskid = this.props.match.params.taskid;
    axios_inst.get("/submissions/" + taskid)
      .then(response => {
        let sub = response.data;
        sub.reverse();
        if (sub.length !== 0) {
          this.setState({
            submissions: sub
          })
        }
      });
  }

  onChangeHandler = event => {
    this.setState({
      fileName: event.target.files[0].name,
      selectedFile: event.target.files[0]
    })
  };

  onClickHandler = event => {
    let reader = new FileReader();
    reader.readAsText(this.state.selectedFile);
    reader.onload = () => {
      axios_inst.post('/submit/' + this.state.taskid,
        reader.result,
        {
          headers: {
            'Content-Type': 'text/plain',
          }
        }
      ).then(() => {
        this.setState({
          fileName: "Keine Datei ausgewählt",
          selectedFile: null
        })
        this.getSubmissions();
      }).catch(error => {
        console.log(error);
      });
    }
    reader.onerror = function (evt) {
      // alert machen
    }
  };

  render() {
    return (
      <div className="tile is-parent is-vertical">
        <div className="tile is-child box" >
          <h1 className="title ml-3 mt-3">{this.state.title}</h1>
          <p className="m-3" dangerouslySetInnerHTML={{ __html: marked(this.state.task) }} />
          <div className="field is-grouped">
            <div className="control">
              <div className="file has-name ml-3 is-focused is-link is-light">
                <label className="file-label">
                  <input className="file-input ml-3" type="file" accept=".c" name="cfile" onChange={this.onChangeHandler} />
                  <span className="file-cta">
                    <span className="file-icon">
                      <Icon path={mdiUpload} />
                    </span>
                    <span className="file-label">
                      Datei auswählen
                      </span>
                  </span>
                  <span className="file-name">
                    {this.state.fileName}
                  </span>
                </label>
              </div>
            </div>
            <div className="control">
              <button className="button is-primary ml-6" disabled={this.state.selectedFile === null} type="button" onClick={this.onClickHandler}>Lösung
                                hochladen </button>
            </div>
          </div>
        </div>
        {this.state.submissions.length !== 0 && <SubmissionOverview submissions={this.state.submissions} />}
      </div>
    )
  }
}

export default withRouter(ExercisePage);