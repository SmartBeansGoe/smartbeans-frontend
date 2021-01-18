import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import marked from 'marked';

export default class Submission extends Component {
  state = {
    componentHeight: 0,
    type: '',
    timestamp: '',
    isCunit: false,
    sourceCode: '',
    score: '',
    compileResult: '',
    feedback: '',
  };

  handler = (previousHeight, currentHeight) => {
    this.setState({
      componentHeight: currentHeight,
    });
    this.props.handler(previousHeight, currentHeight);
  };

  componentDidMount() {
    let feedback = '<p>';
    let endpTag = '</p>';
    switch (this.props.result.result.type) {
      case 'SUCCESS':
        feedback = 'Erfolg!' + endpTag;
        break;
      case 'WRONG_ANSWER':
        this.props.result.result.feedback.forEach((testCase) => {
          feedback +=
            '<pre> <code> <strong>Eingabe:</strong> <br>' +
            testCase.testCase.stdin +
            '\nSoll-Ausgabe:\n' +
            testCase.testCase.stdout +
            '\nIst-Ausgabe:\n' +
            testCase.testResult.stdout +
            '\n';
        });
        feedback += 'Falsche Ausgabe' + endpTag;
        break;
      case 'RUN_ERROR':
        feedback = 'Laufzeitfehler' + endpTag;
        break;
      case 'COMPILE_ERROR':
        feedback = 'Compilezeitfehler' + endpTag;
        break;
      case 'EVALUATION_ERROR':
        feedback = 'Interner Fehler' + endpTag;
        break;
      case 'TIME_LIMIT':
        feedback = 'Zeitüberschreitung' + endpTag;
        break;
      default:
        feedback = 'unbekannter Fehler' + endpTag;
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
          : marked(this.props.result.result.compileResult.stdout),
      isCompileResult:
        this.props.result.result.type === 'COMPILE_ERROR' ? true : false,
      feedback: feedback,
      isSuccess: this.props.result.result.type === 'SUCCESS',
    });
  }

  render() {
    console.log(this.state.compileResult);
    return (
      <React.Fragment>
        <Card
          title={`Versuch ${this.props.id}`}
          isSuccess={this.state.isSuccess}
          hasSymbol={true}
          componentHeight={this.state.componentHeight}
          handler={this.handler}
        >
          {() => (
            <React.Fragment>
              <h1 className="title is-6 mb-3">Quelltext</h1>
              <pre>
                <code> {this.state.sourceCode}</code>
              </pre>
              {this.state.isCompileResult && (
                <React.Fragment>
                  <h1 className="title is-6 mt-5 mb-3">
                    Ausgabe des Compliers
                  </h1>
                  <pre>
                    <code>
                      {this.state.compileResult}
                      {/* <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.compileResult,
                        }}
                      ></div> */}
                    </code>
                  </pre>
                </React.Fragment>
              )}

              <h1 className="title is-6 mt-5 mb-3">Feedback</h1>
              <p>{this.state.feedback}</p>
            </React.Fragment>
          )}
        </Card>
      </React.Fragment>
    );
  }
}

Submission.propTypes = {
  id: PropTypes.number,
  result: PropTypes.object,
};
