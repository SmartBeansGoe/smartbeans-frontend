import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      fileName: 'Keine Datei ausgewählt',
      selectedFile: null,
      isLoading: false,
      isDisabled: true,
      source: source,
      isError: false,
    };
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
        .post(
          '/submit/' + parseInt(this.props.match.params.taskid),
          reader.result,
          {
            headers: {
              'Content-Type': 'text/plain',
            },
          }
        )
        .then(() => {
          this.setState({
            fileName: 'Keine Datei ausgewählt',
            selectedFile: null,
            isLoading: false,
          });
          this.props.loadSubmissions();
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
      console.log('onerrorreader: ', event);
      this.context({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: new Date().toLocaleString(),
          type: 'is-danger',
          message:
            'Bitte überprüfen Sie die Datei und probieren Sie das Hochladen noch einmal',
          title: 'Fehler beim Einlesen der Datei',
          pictureId: -1,
          name: null,
        },
      });
      reader.abort();
    };
    reader.readAsText(this.state.selectedFile);
  };

  render() {
    let taskid = parseInt(this.props.match.params.taskid);
    let exercise = this.props.exercises.filter(
      (exercise) => exercise.taskid === taskid
    )[0];
    let name = '';
    let task = '';
    let submissions = this.props.submissions
      .filter((submission) => submission.taskid === taskid)
      .sort((a, b) => a.timestamp < b.timestamp);

    if (exercise !== undefined) {
      name = exercise.name;
      task = exercise.task;
    }

    return (
      <div className="tile is-parent is-vertical exercise_page">
        <div className="tile is-child box">
          <h1 className="title ml-3 mt-3">{name}</h1>
          <div dangerouslySetInnerHTML={{ __html: marked(task) }} />
          <div className="field is-grouped " style={{ flexWrap: 'wrap' }}>
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
                      <Icon path={mdiUpload} size={1} />
                    </span>
                    <span className="file-label">Datei auswählen</span>
                  </span>
                  <span className="file-name" style={{ width: '200px' }}>
                    {this.state.fileName}
                  </span>
                </label>
              </div>
            </div>
            <div className="control">
              <button
                className={`button ${
                  this.state.isError ? 'is-danger' : 'is-primary'
                }  mt-4 ${this.state.isLoading ? 'is-loading' : ''}`}
                disabled={this.state.isDisabled}
                type="button"
                onClick={this.onClickHandler}
              >
                {this.state.isError
                  ? 'Fehler aufgetretten'
                  : 'Lösung hochladen'}
              </button>
            </div>
          </div>
        </div>
        <SubmissionOverview submissions={submissions} />
      </div>
    );
  }
}

export default withRouter(ExercisePage);

ExercisePage.propTypes = {
  exercises: PropTypes.array.isRequired,
  submissions: PropTypes.array.isRequired,
};
