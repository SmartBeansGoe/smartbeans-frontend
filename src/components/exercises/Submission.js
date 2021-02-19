import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import lang from '../../lang/de_DE.json';
import axios_inst from '../../js/backend';
import { NotificationContext } from './../notification/NotificationProvider';

export default class Submission extends Component {
  static contextType = NotificationContext;
  constructor(props) {
    super(props);
    this.state = {
      componentHeight: 20000,
      type: '',
      timestamp: '',
      isCunit: false,
      sourceCode: '',
      score: '',
      compileResult: '',
      feedback: '',
    };
    this.handler = this.handler.bind(this);
  }

  handler = (previousHeight, currentHeight) => {
    this.setState({
      componentHeight: currentHeight,
    });
    this.props.handler(previousHeight, currentHeight);
  };

  componentDidMount() {
    let feedback = '';
    if (this.props.result.result.testtype === 'simple') {
      feedback = '<div>';
      let endpTag = '</div>';
      switch (this.props.result.result.type) {
        case 'SUCCESS':
          feedback += lang['submission.target-success'] + '!' + endpTag;
          break;
        case 'WRONG_ANSWER':
          feedback += '<h2>' + lang['submission.wrong-output'] + '</h2> <br>';
          this.props.result.result.feedback.forEach((testCase, index) => {
            feedback +=
              lang['submission.test'] +
              ' ' +
              (index + 1) +
              '<pre class="p-4 mb-3"><code><strong>' +
              lang['submission.input'] +
              ':</strong> <br>' +
              (testCase.testCase.stdin !== ''
                ? testCase.testCase.stdin
                : '(' + lang['submission.empty'] + ')') +
              '\n<strong>' +
              lang['submission.target-output'] +
              ':</strong>\n' +
              (testCase.testCase.stdout !== ''
                ? testCase.testCase.stdout
                : '(' + lang['submission.empty'] + ')') +
              '\n<strong>' +
              lang['submission.actual-output'] +
              ':</strong>\n' +
              testCase.testResult.stdout +
              '</code></pre>';
          });
          feedback += endpTag;
          break;
        case 'RUN_ERROR':
          feedback += lang['submission.run-error'] + endpTag;
          break;
        case 'COMPILE_ERROR':
          feedback += lang['submission.compile-error'] + endpTag;
          break;
        case 'EVALUATION_ERROR':
          feedback += lang['submission.evaluation-error'] + endpTag;
          break;
        case 'TIME_LIMIT':
          feedback += lang['submission.time-limit'] + endpTag;
          break;
        default:
          feedback += lang['submission.unknown-error'] + endpTag;
      }
    } else {
      feedback =
        '<article class="message is-info"><div class="message-body"> <strong>' +
        lang['submission.note-on-task-type'] +
        ':</strong> <br>' + lang["submission.error-message"] + '</div></article>';
      feedback +=
        "<pre class='mt-0 pt-0'><code>" +
        this.props.result.result.feedback.stdout +
        '</code></pre>';
    }

    this.setState({
      sourceCode: this.props.result.sourceCode,
      timestamp: this.props.result.timestamp,
      type: this.props.result.result.type,
      testtype: this.props.result.result.testtype === 'cunit' ? true : false,
      score: this.props.result.result.score,
      compileResult:
        this.props.result.result.type === 'TIME_LIMIT'
          ? ''
          : this.props.result.result.compileResult.stdout,
      isCompileResult:
        this.props.result.result.type === 'COMPILE_ERROR' ? true : false,
      feedback: feedback,
      isSuccess: this.props.result.result.score === 1,
    });
  }

  shareSubmission = () => {
    axios_inst
      .post(`/share/${this.props.result.taskid}/${this.props.result.timestamp}`)
      .then(response => {
        try {
          var winHandle = window.open(response.data, "_blank");
        } catch (error) {
          this.showErrorNotificationPopupBlocked();
        } finally {
          if (!winHandle) {
            this.showErrorNotificationPopupBlocked();
          }
        }
      })
      .catch(error => {
        this.context({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: new Date().toLocaleString(),
            type: 'text',
            message: lang['submission.share-sourecode-problem.message'],
            title: lang['submission.share-sourecode-problem.title'],
            colorClass: 'is-danger'
          },
        });
      })
  }

  showErrorNotificationPopupBlocked = () => {
    this.context({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: new Date().toLocaleString(),
        type: 'text',
        message: lang['submission.popup-blocked.message'],
        title: lang['submission.popup-blocked.title'],
        colorClass: 'is-danger'
      },
    });
  }

  render() {
    return (
      <React.Fragment>
        <Card
          title={`${lang['submission.attempt']} ${this.props.id}`}
          isSuccess={this.state.isSuccess}
          hasSymbol={true}
          componentHeight={this.state.componentHeight}
          handler={this.handler}
          defaultOpen={this.props.defaultOpen}
        >
          {() => (
            <React.Fragment>
              <div className="mb-3 mt-1" style={{ position: 'relative' }} >
                <span>
                  <h1 className="title is-6">
                    {lang['submission.source-code']}
                  </h1>
                </span>
                <span
                  style={{
                    position: 'absolute',
                    right: '0px',
                    top: '-15px'
                  }}>
                  <button className="button is-link " onClick={this.shareSubmission}>Quelltext teilen</button>
                </span>
              </div>

              <pre>
                <code>{this.state.sourceCode}</code>
              </pre>
              {this.state.isCompileResult && (
                <React.Fragment>
                  <h1 className="title is-6  mt-5 mb-3">
                    {lang['submission.compile-output']}
                  </h1>
                  <pre>
                    <code
                      dangerouslySetInnerHTML={{
                        __html: this.state.compileResult,
                      }}
                    ></code>
                  </pre>
                </React.Fragment>
              )}
              <h1 className="title is-6 mt-5 mb-3">
                {lang['submission.feedback']}
              </h1>
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: this.state.feedback }}
                />
              </div>
            </React.Fragment>
          )}
        </Card>
      </React.Fragment >
    );
  }
}

Submission.propTypes = {
  id: PropTypes.number.isRequired,
  result: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
};
