import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default class Submission extends Component {
  state = {
    componentHeight: 0,
    type: "",
    timestamp: "",
    isCunit: false,
    sourceCode: "",
    score: "",
    compileResult: "",
    feedback: "",
  }

  handler = (previousHeight, currentHeight) => {
    this.setState({
      componentHeight: currentHeight
    });
    this.props.handler(previousHeight, currentHeight);
  }

  componentDidMount() {
    let feedback = "";
    if (this.props.result.result.type === "SUCCESS") {
      feedback = "Alles richtig!"
    } else if (this.props.result.result.type === "COMPILE_ERROR") {
      feedback = "Compilezeitfehler"
    } else if (this.props.result.result.type === "WRONG_ANSWER") {
      feedback = "Falsche Ausgabe\n";
      console.log(this.props.result.result.feedback);
      this.props.result.result.feedback.map(testCase => {
        console.log(testCase);
        feedback += "Eingabe:\n" + testCase.testCase.stdin + "\nSoll-Ausgabe:\n" + testCase.testCase.stdout + "\nIst-Ausgabe:\n" + testCase.testResult.stdout + "\n";
      });
    }
    
    this.setState({
      sourceCode: this.props.result.sourceCode,
      timestamp: this.props.result.timestamp,
      type: this.props.result.result.type,
      testtype: this.props.result.result.testtype === "cunit" ? true : false,
      score: this.props.result.result.score,
      compileResult: this.props.result.result.type === "TIME_LIMIT" ? "" : this.props.result.result.compileResult,
      isCompileResult: this.props.result.result.type === "COMPILE_ERROR" ? true : false,
      feedback: feedback,
      isSuccess: this.props.result.result.type === "SUCCESS",
    })

  }



  render() {
    return (
      <React.Fragment>
        <Card title={`Versuch ${this.props.id}`} isSuccess={this.state.isSuccess} hasSymbol={true} componentHeight={this.state.componentHeight} handler={this.handler}>
          {() => (
            <React.Fragment>
              <h1 className="title is-6">Quelltext</h1>
              <pre><code> {this.state.sourceCode}</code></pre>
              {this.state.isCompileResult && <React.Fragment>
                <h1 className="title is-6">Ausgabe des Compliers</h1>
                <p> {this.state.compileResult.stdout}
                </p></React.Fragment>}

              <h1 className="title is-6">Feedback</h1>
              <p>{this.state.feedback}</p>
            </React.Fragment>)
          }
        </Card>
      </React.Fragment>
    )
  }
}

Submission.propTypes = {
  id: PropTypes.number,
  result: PropTypes.object,
}
