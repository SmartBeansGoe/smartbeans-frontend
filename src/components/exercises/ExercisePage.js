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
    };
  }

  componentDidMount() {
    this.getTask();
    this.getSubmissions();
  }

  componentWillUnmount() {
    this.state.source.cancel('Cancel submissions');
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
    axios_inst.get(`/tasks?id=${taskid}`).then((res) => {
      let task = res.data[0];
      this.addTaskToState(task);
    })
      .catch(error => {
      })
  }

  addTaskToState(exercise) {
    this.setState({
      title: exercise.name,
      task: marked(exercise.task),
      solved: exercise.solved,
      taskid: exercise.taskid,
    });
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
    });
  };

  onClickHandler = (event) => {
    this.setState({
      isLoading: true,
      isDisabled: true,
    });
    let reader = new FileReader();
    reader.readAsText(this.state.selectedFile);
    reader.onload = () => {
      axios_inst
        .post('/submit/' + this.state.taskid, reader.result, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .then(() => {
          let oldLength = this.state.submissions.length;
          this.getSubmissions();
          this.setState({
            fileName: 'Keine Datei ausgewählt',
            selectedFile: null,
            isLoading: false,
          });
          this.updateExercises(oldLength, 0);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    reader.onerror = function (evt) {
      // this.context({
      //   type: 'ADD_NOTIFICATION',
      //   payload: {
      //     id: message.id,
      //     type: message.type,
      //     message: messageBody,
      //     title: title,
      //     achievementId: pictureId,
      //     achievementName: name,
      //   },
      // });
    };
  };

  updateExercises(oldLength, tries) {
    setTimeout(() => {
      if (tries <= 20) {
        if (oldLength !== this.state.submissions.length) {
          if (this.state.submissions[0].result.score === 1) {
            this.props.setTaskSolved(this.state.taskid);
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
            <div className="control mr-6">
              <div className="file has-name  mt-4 is-focused is-link is-light">
                <label className="file-label">
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
                    <span className="file-label">Datei auswählen</span>
                  </span>
                  <span className="file-name">{this.state.fileName}</span>
                </label>
              </div>
            </div>
            <div className="control">
              <button
                className={`button is-primary  mt-4 ${this.state.isLoading ? 'is-loading' : ''
                  }`}
                disabled={this.state.isDisabled}
                type="button"
                onClick={this.onClickHandler}
              >
                Lösung hochladen{' '}
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
