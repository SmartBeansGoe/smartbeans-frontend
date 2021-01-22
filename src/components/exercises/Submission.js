import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentHeight: 0,
      type: '',
      timestamp: '',
      isCunit: false,
      sourceCode: '',
      score: '',
      compileResult: '',
      feedback: '',
    };
  }

  handler = (previousHeight, currentHeight) => {
    this.setState({
      componentHeight: currentHeight,
    });
    this.props.handler(previousHeight, currentHeight);
  };

  componentDidMount() {
    let feedback = '';
    if (this.props.result.result.testtype === "simple") {
      feedback = '<div>';
      let endpTag = '</div>';
      switch (this.props.result.result.type) {
        case 'SUCCESS':
          feedback += 'Erfolg!' + endpTag;
          break;
        case 'WRONG_ANSWER':
          feedback += '<h2>Falsche Ausgabe</h2> <br>';
          this.props.result.result.feedback.forEach((testCase, index) => {
            feedback +=
              'Test ' + (index + 1) +
              '<pre class="p-4 mb-3"><code><strong>Eingabe:</strong> <br>' +
              (testCase.testCase.stdin !== "" ?
                testCase.testCase.stdin : "(leer)") +
              '\n<strong>Soll-Ausgabe:</strong>\n' +
              (testCase.testCase.stdout !== "" ?
                testCase.testCase.stdout : "(leer)") +
              '\n<strong>Ist-Ausgabe:</strong>\n' +
              testCase.testResult.stdout +
              '</code></pre>';
          });
          feedback += endpTag;
          break;
        case 'RUN_ERROR':
          feedback += 'Laufzeitfehler' + endpTag;
          break;
        case 'COMPILE_ERROR':
          feedback += ' Compilezeitfehler ' + endpTag;
          break;
        case 'EVALUATION_ERROR':
          feedback += 'Interner Fehler' + endpTag;
          break;
        case 'TIME_LIMIT':
          feedback += 'Zeitüberschreitung' + endpTag;
          break;
        default:
          feedback += 'unbekannter Fehler' + endpTag;
      }
    } else {
      feedback = '<article class="message is-info"><div class="message-body"> <strong>Hinweis zum Aufgabentyp:</strong> <br>Hier ist KEINE Eingabe und Ausgabe verlangt. Die Einsendung darf KEINE main-Funktion enthalten. <br>Dieser Aufgabentyp wird (noch) nicht ganz korrekt erkannt. Das betrifft vor allem auch das Bewertungsergebnis. Die Aufgabe ist richtig, wenn die Spalte "Failed" nur Nullen enthalten. Zusätzlich werden alle fehlerhaften Aufrufe über der Tabelle aufgelistet.</div></article>'
      feedback += "<pre class='mt-0 pt-0'><code>" + this.props.result.result.feedback.stdout + "</code></pre>";
    }

    this.setState({
      sourceCode: (this.props.result.sourceCode),
      timestamp: this.props.result.timestamp,
      type: this.props.result.result.type,
      testtype: this.props.result.result.testtype === 'cunit' ? true : false,
      score: this.props.result.result.score,
      compileResult:
        this.props.result.result.type === 'TIME_LIMIT'
          ? ''
          : (this.props.result.result.compileResult.stdout),
      isCompileResult:
        this.props.result.result.type === 'COMPILE_ERROR' ? true : false,
      feedback: feedback,
      isSuccess: this.props.result.result.score === 1,
    });
  }

  render() {
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
              <h1 className="title is-6  mb-3">Quelltext</h1>
              <pre>
                <code>
                  {this.state.sourceCode}
                </code>
              </pre>
              {this.state.isCompileResult && (
                <React.Fragment>
                  <h1 className="title is-6  mt-5 mb-3">
                    Ausgabe des Compliers
                  </h1>
                  <pre>
                    <code dangerouslySetInnerHTML={{
                      __html: this.state.compileResult,
                    }}>
                    </code>
                  </pre>
                </React.Fragment>
              )}
              <h1 className="title is-6 mt-5 mb-3">Feedback</h1>
              <div>
                <div dangerouslySetInnerHTML={{ __html: this.state.feedback }} />
              </div>
            </React.Fragment>
          )}
        </Card>
      </React.Fragment >
    );
  }
}

Submission.propTypes = {
  id: PropTypes.number,
  result: PropTypes.object,
};
