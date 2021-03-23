import { mdiInformation } from '@mdi/js';
import Icon from '@mdi/react';
import React, { Component } from 'react';
import axios_inst from '../../js/backend';
import { BLUE } from '../../js/constants';
import { Modal } from '../Modal';
import LikertStatement from './LikertStatement';

import './Survey.css';

export default class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Multiple statements does not work because the radiobuttons are "overlapping"
      statements: [
        {
          id: 0,
          statement: 'Ich fühle mich gut auf die Prüfung vorbereitet.',
          numberAnswerOptions: 7,
          value: null,
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(statementId, value) {
    let statement = this.state.statements.filter((x) => statementId === x.id);
    let index = this.state.statements.findIndex((x) => statementId === x.id);

    if (statement.length > 1) {
      throw Error('Multiple statements with id: ' + statementId);
    }
    if (statement.length === 0) {
      throw Error('No statement with id ' + statementId);
    } else {
      let statements = [...this.state.statements];
      let item = { ...statements[index] };
      item.value = value;
      statements[index] = item;
      this.setState({
        statements: statements,
      });
    }
  }

  handleSubmit() {
    // TODO: Change that not only for first statement
    axios_inst
      .post('/user/submit_survey', this.state.statements[0].value)
      .then(() => {
        this.props.setSurveyDone();
      })
      .catch();
  }

  checkAllAnswered() {
    let notAnsweredStatements = this.state.statements.filter(
      (el) => el.value === null
    );
    return notAnsweredStatements.length > 0;
  }

  render() {
    return (
      <div>
        <Modal
          title="Umfrage"
          modalState={this.props.modalState}
          closeModal={this.props.setSurveyDone}
          width="50%"
          height="50%"
          footer={
            <footer className="modal-card-foot">
              <span
                style={{
                  textAlign: 'left',
                  width: '70%',
                  display: 'inline-block',
                }}
              >
                <span
                  style={{
                    paddingRight: 10,
                  }}
                >
                  <Icon
                    path={mdiInformation}
                    size={1.0}
                    style={{
                      position: 'relative',
                      top: '5px',
                      left: '5px',
                      color: BLUE,
                    }}
                  />
                </span>
                <span>
                  Die Ergebnisse werden anonym gespeichert. Es erfolgt keine
                  Accountzuordnung.
                </span>
              </span>
              <span
                style={{
                  textAlign: 'right',
                  width: '30%',
                  display: 'inline-block',
                }}
              >
                <button
                  className="button is-success"
                  disabled={this.checkAllAnswered()}
                  onClick={this.handleSubmit}
                >
                  Bestätigen
                </button>
              </span>
            </footer>
          }
        >
          {this.state.statements.map((el) => (
            <LikertStatement
              key={el.id}
              id={el.id}
              statement={el.statement}
              numberAnswerOptions={el.numberAnswerOptions}
              handleChange={this.handleChange}
            />
          ))}
        </Modal>
      </div>
    );
  }
}
