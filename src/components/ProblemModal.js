import React, { Component } from 'react';
import { NotificationContext } from './notification/NotificationProvider';
import { Modal } from './Modal';
import lang from '../lang/de_DE.json';
import axios_inst from '../js/backend';

export default class ProblemModal extends Component {
  static contextType = NotificationContext;
  constructor() {
    super();
    this.state = {
      textAreaValue: '',
      modalState: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;

      return { modalState: newState, textAreaValue: '' };
    });
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
  }

  clearInput() {
    this.setState({
      textAreaValue: '',
    });
  }

  reportProblem = () => {
    axios_inst
      .post(
        '/report_error',
        'Location: ' + window.location.href + '\n' + this.state.textAreaValue,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      )
      .then(() => {
        this.context({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: new Date().toLocaleString(),
            type: 'text',
            title: lang['problem.report.title'],
            message: lang['problem.report.message'],
          },
        });
      })
      .catch((error) => {
        this.context({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: new Date().toLocaleString(),
            type: 'text',
            title: lang['problem.error.title'],
            message: lang['problem.error.message'],
            colorClass: 'is-danger',
          },
        });
      });
    this.clearInput();
    this.toggleModal();
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="button is-danger is-light is-outlined"
          type="button"
          onClick={this.toggleModal}
        >
          {lang['exercise.problem.report']}
        </button>
        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          title={lang['exercise.problem.report']}
          height={'300'}
          width={'600'}
          clearInput={this.clearInput}
        >
          <div>
            <h5>{lang['exercise.problem.messageprompt']}</h5>
            <div>
              <textarea
                value={this.state.textAreaValue}
                onChange={this.handleChange}
                rows={6}
                style={{ width: '100%' }}
              ></textarea>
            </div>
            <div className="mt-3">
              <button className="button is-light" onClick={this.toggleModal}>
                {lang['exercise.problem.abort']}
              </button>
              <button
                className="button is-link"
                onClick={this.reportProblem}
                disabled={this.state.textAreaValue === ''}
                style={{ float: 'right' }}
              >
                {lang['exercise.problem.submit']}
              </button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
