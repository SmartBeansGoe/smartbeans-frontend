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
import lang from '../../lang/de_DE.json';
import BeanWrapper from './BeanWrapper';
import assetIDs from '../character/sources/assetIDs.json';

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
        .then((response) => {
          this.sendNotificationForFirstSolve(response);
          this.setState({
            fileName: lang['exercise.no-file-selected'],
            selectedFile: null,
            isLoading: false,
          });
          this.props.loadSubmissions();
          this.props.loadExercises();
          this.props.loadLevelData();
        })
        .catch((error) => {
          this.props.handleError(error);
          this.setState({
            fileName: lang['exercise.no-file-selected'],
            selectedFile: null,
            isLoading: false,
            isError: true,
            isDisabled: true,
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
    var _this = this;
    reader.onerror = function (error) {
      _this.setState({
        fileName: lang['exercise.no-file-selected'],
        selectedFile: null,
        isLoading: false,
        isError: true,
        isDisabled: true,
      });
      _this.context({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: new Date().getTime(),
          type: 'text',
          title: lang['exercise.read-error.title'],
          message: lang['exercise.read-error.message'],
          colorClass: 'is-danger',
        },
      });
      reader.abort();
    };
    reader.readAsText(this.state.selectedFile);
  };

  sendNotificationForFirstSolve(response) {
    if (response.data.score === 1) {
      let result = this.props.submissions.filter(
        (submission) => submission.score === 1
      );
      if (result.length === 0) {
        let assets = assetIDs.filter(
          (asset) =>
            asset.precondition.taskId ===
            parseInt(this.props.match.params.taskid)
        );
        if (assets.length !== 0) {
          this.context({
            type: 'ADD_NOTIFICATION',
            payload: {
              id: new Date().getTime(),
              type: 'assets_unlocked',
              title: lang['app.notifications.asset.title'],
              message: lang['app.notifications.asset.message'],
              assetsIds: result,
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

    if (exercise !== undefined) {
      name = exercise.name;
      task = exercise.task;
      // TODO was soll den der Scheis??? wenn es nur eine Kategorie ist ist es statt ein Array mit nur einem eintrag ein string!!! das zerschiest mir alles!!!!
      if (exercise.categories === undefined || exercise.categories === null) {
        categories = [];
      } else if (typeof exercise.categories === 'string') {
        categories = [exercise.categories];
      } else if (Array.isArray(exercise.categories)) {
        categories = exercise.categories;
      } else {
        console.log('WTF den noch?');
      }
    }
    return (
      <React.Fragment>
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
                      <span className="file-label">
                        {lang['exercise.select-file']}
                      </span>
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
                    ? lang['exercise.error-occured']
                    : lang['exercise.upload-solution']}
                </button>
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
  charname: PropTypes.string.isRequired,
  character: PropTypes.object.isRequired,
};
