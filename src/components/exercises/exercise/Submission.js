import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import lang from '../../../lang/de_DE.json';
import axios_inst from '../../../js/backend';
import { NotificationContext } from '../../notification/NotificationProvider';

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
      isSuccess: false,
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
    console.log(this.props.result);
    let feedback =
      "<pre class='mt-0 pt-0'><code>" +
      lang['submission.error-no-feedback'] +
      '</code></pre>';
    if (this.props.result === null) {
      return;
    }
    let type = '';
    let testtype = '';
    let score = 0;
    let compileResult = '';
    let isCompileResult = false;
    let isSuccess = false;
    feedback = '<div>';
    let endpTag = '</div>';
    if (this.props.result.result === null) return;
    switch (this.props.result.result.result_type) {
      case 'Success':
        isSuccess = true;
        feedback +=
          lang['submission.target-success'] +
          ':\n' +
          '<pre><code>' +
          this.props.result.result.feedback +
          '</code></pre>' +
          endpTag;
        break;
      case 'Failed':
        feedback +=
          lang['submission.wrong-output'] +
          ':\n' +
          '<pre><code>' +
          this.props.result.result.feedback +
          '</code></pre>' +
          endpTag;
        break;
      // case 'WRONG_ANSWER':
      //   feedback += '<h2>' + lang['submission.wrong-output'] + this.props.feedback + '</h2> <br>';
      //   break;
      // case 'RUN_ERROR':
      //   feedback += lang['submission.run-error'] + endpTag;
      //   break;
      // case 'COMPILE_ERROR':
      //   feedback += lang['submission.compile-error'] + endpTag;
      //   break;
      case 'EvaluationError':
        feedback +=
          lang['submission.evaluation-error'] +
          ':\n' +
          '<pre><code>' +
          this.props.result.result.feedback +
          '</code></pre>' +
          endpTag;
        break;
      case 'TimeOut':
        feedback +=
          lang['submission.time-limit'] +
          ':\n' +
          '<pre><code>' +
          this.props.result.result.feedback +
          '</code></pre>' +
          endpTag;
        break;
      default:
        feedback += lang['submission.unknown-error'] + ':\n' + endpTag;
    }
    this.setState({
      sourceCode: this.props.result.sourceCode,
      timestamp: this.props.result.timestamp,
      type: type,
      testtype: testtype,
      score: score,
      compileResult: compileResult,
      isCompileResult: isCompileResult,
      feedback: feedback,
      isSuccess: isSuccess,
    });
  }

  shareSubmission = () => {
    axios_inst
      .post(`/share/${this.props.result.taskid}/${this.props.result.timestamp}`)
      .then((response) => {
        try {
          var winHandle = window.open(response.data, '_blank');
        } catch (error) {
          this.showErrorNotificationPopupBlocked();
        } finally {
          if (!winHandle) {
            this.showErrorNotificationPopupBlocked();
          }
        }
      })
      .catch((error) => {
        this.context({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: new Date().toLocaleString(),
            type: 'text',
            message: lang['submission.share-sourecode-problem.message'],
            title: lang['submission.share-sourecode-problem.title'],
            colorClass: 'is-danger',
          },
        });
      });
  };

  showErrorNotificationPopupBlocked = () => {
    this.context({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: new Date().toLocaleString(),
        type: 'text',
        message: lang['submission.popup-blocked.message'],
        title: lang['submission.popup-blocked.title'],
        colorClass: 'is-danger',
      },
    });
  };

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
              <div className="mb-3 mt-1" style={{ position: 'relative' }}>
                <span>
                  <h1 className="title is-6">
                    {lang['submission.source-code']}
                  </h1>
                </span>
                <span
                  style={{
                    position: 'absolute',
                    right: '0px',
                    top: '-15px',
                  }}
                >
                  <button
                    className="button is-link "
                    onClick={this.shareSubmission}
                  >
                    {lang['submission.share-sourcecode.button']}
                  </button>
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
      </React.Fragment>
    );
  }
}

Submission.propTypes = {
  id: PropTypes.number.isRequired,
  result: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
  defaultOpen: PropTypes.bool.isRequired,
};
