import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import axios_inst from '../../../js/backend';
import SubmissionOverview from './SubmissionOverview';
import { withRouter } from 'react-router';
import { mdiUpload, mdiCheckBold, mdiDownload } from '@mdi/js';
import { Icon } from '@mdi/react';
import './ExercisePage.css';
import { NotificationContext } from '../../notification/NotificationProvider';
import lang from '../../../lang/de_DE.json';
import BeanWrapper from './BeanWrapper';
import assets from '../../../data/assets.json';
import axiosRetry from 'axios-retry';
import Editor from '@monaco-editor/react';

axiosRetry(axios_inst, {
  retries: 5,
  retryDelay: (retryCount) => {
    return retryCount * 500;
  },
});

class ExercisePage extends Component {
  static contextType = NotificationContext;
  constructor(props) {
    super(props);
    this.state = {
      fileName: lang['exercise.no-file-selected'],
      selectedFile: null,
      isLoading: false,
      isDisabled: true,
      isError: false,
      inputKey: Math.random().toString(36),
      textAreaValue: '',
    };
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  handleTextAreaChange(value, event) {
    this.setState({ textAreaValue: value });
    this.setState({
      isDisabled: !(this.state.textAreaValue.length > 0),
      isError: false,
    });
  }

  onChangeHandler = (event) => {
    if (event.target.files.length !== 0) {
      var file = event.target.files[0];

      this.setState({
        fileName: event.target.files[0].name,
        selectedFile: event.target.files[0],
        isDisabled: false,
        isError: false,
      });
      let reader = new FileReader();
      reader.onload = (event) => {
        this.setState({
          textAreaValue: reader.result,
        });
      };

      reader.readAsText(file);
    }
  };

  onClickHandler = (e) => {
    this.setState({
      isLoading: true,
      isDisabled: true,
    });

    axios_inst
      .post(
        '/submit/' + parseInt(this.props.match.params.taskid),
        this.state.textAreaValue,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      )
      .then((response) => {
        this.sendNotificationForFirstSolve(response);
        this.setState({
          fileName: lang['exercise.no-file-selected'],
          selectedFile: null,
          isLoading: false,
          inputKey: Math.random().toString(36),
        });
        this.props.loadSubmissions();
        if (response.data.score === 1) {
          this.props.loadExercises();
          this.props.loadLevelData();
          this.props.loadAssets();
        }
      })
      .catch((error) => {
        this.setState({
          fileName: lang['exercise.no-file-selected'],
          selectedFile: null,
          isLoading: false,
          isError: true,
          isDisabled: true,
          inputKey: Math.random().toString(36),
        });

        this.context({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: new Date().getTime(),
            type: 'text',
            title: lang['exercise.upload-error.title'],
            message: lang['exercise.upload-error.message'],
            colorClass: 'is-danger',
          },
        });
      });
  };

  saveCode(filename, code) {
    const element = document.createElement('a');
    const file = new Blob([code], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = filename + '.py';
    document.body.appendChild(element);
    element.click();
  }

  sendNotificationForFirstSolve(response) {
    if (response.data.score === 1) {
      let result = this.props.submissions.filter(
        (submission) => submission.result.score === 1
      );
      if (result.length === 0) {
        let filterd_assets = assets.filter(
          (asset) =>
            asset.precondition['task-id'] ===
            parseInt(this.props.match.params.taskid)
        );
        if (filterd_assets.length !== 0) {
          this.context({
            type: 'ADD_NOTIFICATION',
            payload: {
              id: new Date().getTime(),
              type: 'assets_unlocked',
              title: lang['app.notifications.asset.title'],
              message: lang['app.notifications.asset.message'],
              assets: filterd_assets,
            },
          });
        }
      }
    }
  }

  render() {
    let taskid = parseInt(this.props.match.params.taskid);
    let exercise = this.props.exercises.filter(
      (exercise) => exercise.taskid === taskid
    )[0];
    let name = '';
    let task = '';
    let categories = [];
    let submissions = this.props.submissions.filter(
      (submission) => submission.taskid === taskid
    );
    submissions = submissions.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    });

    let solved =
      submissions.filter((sub) => {
        if (sub.result !== null) return sub.result.score === 1;
        return false;
      }).length > 0;

    if (exercise !== undefined) {
      name = exercise.name;
      task = exercise.task;
      if (Array.isArray(exercise.categories)) {
        categories = exercise.categories;
      }
    }

    console.log(this.state.textAreaValue);

    return (
      <React.Fragment>
        <div className="tile is-parent is-vertical exercise_page">
          <div className="tile is-child box">
            <div className="content ml-3">
              <h1 className="title mt-3">
                {name}
                {solved && (
                  <span
                    className="icon ml-2 has-text-success is-large"
                    style={{ marginTop: '-20px' }}
                  >
                    <svg viewBox="0 -7 48 48" style={{ top: '0px' }}>
                      <Icon path={mdiCheckBold} size={1} />
                    </svg>
                  </span>
                )}
              </h1>
              <div
                dangerouslySetInnerHTML={{ __html: marked(task) }}
                style={{ float: 'left', width: '50%', paddingRight: '20px' }}
              />
              <div
                style={{
                  float: 'left',
                  width: '50%',
                }}
              >
                <h3>Lösung</h3>
                <Editor
                  height="50vh"
                  defaultLanguage="python"
                  defaultValue="# Schreibe hier deine Loesung!"
                  theme="vs-dark"
                  value={this.state.textAreaValue}
                  onChange={this.handleTextAreaChange}
                  options={{
                    automaticLayout: true,
                    minimap: {
                      enabled: false,
                    },
                  }}
                />
                <div
                  className="field is-grouped "
                  style={{ float: 'right', flexWrap: 'wrap' }}
                >
                  <div className="control">
                    <div class="file is-focused is-link is-light mt-4">
                      <label class="file-label">
                        <input
                          className="file-input"
                          type="file"
                          accept=".py"
                          name="python-file"
                          onChange={this.onChangeHandler}
                          key={this.state.inputKey}
                        />
                        <span class="file-cta">
                          <span class="file-icon">
                            <Icon path={mdiUpload} size={1} />
                          </span>
                          <span class="file-label">
                            {lang['exercise.import-file']}
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="control mr-6">
                    <button
                      className="button is-link mt-4 file-cta"
                      onClick={() => {
                        this.saveCode(
                          exercise.shortname.toLowerCase(),
                          this.state.textAreaValue
                        );
                      }}
                    >
                      <span class="file-icon">
                        <Icon path={mdiDownload} size={1} />
                      </span>
                      <span class="file-label">
                        {lang['exercise.export-code']}
                      </span>
                    </button>
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
                        ? lang['exercise.error-occured']
                        : lang['exercise.upload-solution']}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SubmissionOverview submissions={submissions} />
        </div>
        <BeanWrapper
          charname={this.props.charname}
          character={this.props.character}
          taskid={taskid}
          categories={categories}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ExercisePage);

ExercisePage.propTypes = {
  exercises: PropTypes.array.isRequired,
  submissions: PropTypes.array.isRequired,
  loadExercises: PropTypes.func.isRequired,
  loadSubmissions: PropTypes.func.isRequired,
  loadLevelData: PropTypes.func.isRequired,
  loadAssets: PropTypes.func.isRequired,
  charname: PropTypes.string.isRequired,
  character: PropTypes.object.isRequired,
};
