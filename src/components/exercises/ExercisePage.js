import React, { Component } from 'react';
import marked from 'marked';
import axios_inst from '../../js/backend';
import SubmissionOverview from './SubmissionOverview';
import { withRouter } from 'react-router';
import { mdiUpload } from '@mdi/js';
import { Icon } from '@mdi/react';
import './ExercisePage.css';
import { NotificationContext } from './../notification/NotificationProvider';
import axios from 'axios';

class ExercisePage extends Component {
  static contextType = NotificationContext;
  constructor(props) {
    super(props);
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    this.state = {
      title: '',
      task: '',
      solved: '',
      submissions: [],
      fileName: 'Keine Datei ausgewählt',
      selectedFile: null,
      isLoading: false,
      isDisabled: true,
      source: source,
      isError: false,
    };
    this.findTask = this.findTask.bind(this);
  }

  componentDidMount() {
    this.findTask();
  }

  componentWillUnmount() {
    this.state.source.cancel('Cancel submissions');
  }

  findTask() {
    let taskid = parseInt(this.props.match.params.taskid);
    let task;
    this.props.exercises.categories.forEach(categorie => {
      let result = categorie.exerciseList.filter(exercise => exercise.taskid === taskid);
      if (result.length !== 0)
        task = result[0];
    })
    if (task === undefined) {
      setTimeout(this.findTask, 50);
    } else {
      this.addTaskToState(task, 0);
    }
  }

  addTaskToState(exercise, tries) {
    if (tries < 500) {
      if (exercise.submissions === undefined) {
        tries++;
        setTimeout(() => this.addTaskToState(exercise, tries), 50)
      } else {
        this.setState({
          title: exercise.name,
          task: marked(exercise.task),
          solved: exercise.solved,
          taskid: exercise.taskid,
          submissions: exercise.submissions,
        });
      }
    }
  }

  getSubmissions() {
    let taskid = this.props.match.params.taskid;
    axios_inst.get('/submissions/' + taskid, {
      cancelToken: this.state.source.token
    })
      .then((response) => {
        let sub = response.data;
        sub.reverse();
        if (sub.length !== 0) {
          this.setState({
            submissions: sub,
          });
          this.props.addSubmission(this.state.taskid, sub)
        }
      })
      .catch((error) => {
        console.log("error getSubmissions: ", error);
      })
  }

  onChangeHandler = (event) => {
    this.setState({
      fileName: event.target.files[0].name,
      selectedFile: event.target.files[0],
      isDisabled: false,
      isError: false,
    });
  };

  onClickHandler = (e) => {
    this.setState({
      isLoading: true,
      isDisabled: true,
    });
    let reader = new FileReader();

    reader.onload = (event) => {
      axios_inst
        .post('/submit/' + this.state.taskid, reader.result, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .then((res) => {
          let oldLength = this.state.submissions.length;
          this.setState({
            fileName: 'Keine Datei ausgewählt',
            selectedFile: null,
            isLoading: false,
          });
          this.updateExercises(oldLength, 0);
          this.getSubmissions();
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            fileName: 'Keine Datei ausgewählt',
            selectedFile: null,
            isLoading: false,
            isError: true,
            isDisabled: true,
          });

          this.context({
            type: 'ADD_NOTIFICATION',
            payload: {
              id: new Date().toLocaleString(),
              type: 'text',
              message: 'Bitte versuchen Sie es später noch einmal',
              title: 'Fehler beim Hochladen der Datei',
              achievementId: -1,
              achievementName: null,
            },
          });
        });
    };
    reader.onerror = (event) => {
      this.setState({
        fileName: 'Keine Datei ausgewählt',
        selectedFile: null,
        isLoading: false,
        isError: true,
        isDisabled: true,
      });
      console.log("onerrorreader: ", event);
      this.context({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: new Date().toLocaleString(),
          type: 'is-danger',
          message: 'Bitte überprüfen Sie die Datei und probieren Sie das Hochladen noch einmal',
          title: 'Fehler beim Einlesen der Datei',
          pictureId: -1,
          name: null,
        },
      });
      reader.abort();
    };
    reader.readAsText(this.state.selectedFile);
  };

  updateExercises(oldLength, tries) {
    setTimeout(() => {
      if (tries <= 20) {
        if (oldLength !== this.state.submissions.length) {
          if (this.state.submissions[0].result.score === 1) {
            this.props.loadExercises(this.state.taskid);
          }
        } else {
          tries++;
          this.updateExercises(oldLength);
        }
      }
    }, 500
    );
  }

  render() {
    return (
      <div className="tile is-parent is-vertical exercise_page" >
        <div className="tile is-child box" >
          <h1 className="title ml-3 mt-3">{this.state.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: this.state.task }}
          />
          <div className="field is-grouped " style={{ flexWrap: "wrap" }}>
            <div className="control mr-6" >
              <div className="file has-name  mt-4 is-focused is-link is-light">
                <label className="file-label" >
                  <input
                    className="file-input ml-3"
                    type="file"
                    accept=".c"
                    name="cfile"
                    onChange={this.onChangeHandler}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <Icon path={mdiUpload} />
                    </span>
                    <span className="file-label" >Datei auswählen</span>
                  </span>
                  <span className="file-name" style={{ width: "200px" }}>{this.state.fileName}</span>
                </label>
              </div>
            </div>
            <div className="control">
              <button
                className={`button ${this.state.isError ? "is-danger" : "is-primary"}  mt-4 ${this.state.isLoading ? 'is-loading' : ''
                  }`}
                disabled={this.state.isDisabled}
                type="button"
                onClick={this.onClickHandler}
              >
                {this.state.isError ? "Fehler aufgetretten" : "Lösung hochladen"}
              </button>
            </div>
          </div>
        </div>
        {this.state.submissions.length !== 0 && (
          <SubmissionOverview submissions={this.state.submissions} />
        )}
      </div>
    );
  }
}

export default withRouter(ExercisePage);
