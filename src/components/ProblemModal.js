import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      isChecked: false,
      checkboxId: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;

      return { modalState: newState, textAreaValue: '', isChecked: false };
    });
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
  }

  handleCheck() {
    this.setState({ isChecked: !this.state.isChecked });
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
        (this.state.isChecked ? '' : 'User: ' + this.props.username + '\n') +
          'Browser: ' +
          navigator.userAgent +
          '\n' +
          'Location: ' +
          window.location.href +
          '\n\n' +
          this.state.textAreaValue,
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
            id: new Date().getTime(),
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
            id: new Date().getTime(),
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
          {lang['problem.report']}
        </button>
        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          title={lang['problem.report']}
          height={'300'}
          width={'600'}
        >
          <div>
            <h5>{lang['problem.messageprompt']}</h5>
            <div className="field">
              <textarea
                className="textarea"
                value={this.state.textAreaValue}
                onChange={this.handleChange}
                rows={6}
                style={{
                  width: '100%',
                  resize: 'vertical',
                  minHeight: '140px',
                }}
              ></textarea>
            </div>
            <div className="field">
              <label className="checkbox p-1" style={{ color: '#4a4a4a' }}>
                <input
                  style={{
                    verticalAlign: 'middle',
                    bottom: '1px',
                    position: 'relative',
                  }}
                  onChange={this.handleCheck}
                  id="test"
                  type="checkbox"
                  checked={this.state.isChecked}
                />
                {lang['problem.checkbox.label']}
              </label>
            </div>
            <div className="field mt-3">
              <button className="button is-light" onClick={this.toggleModal}>
                {lang['problem.abort']}
              </button>
              <button
                className="button is-link"
                onClick={this.reportProblem}
                disabled={this.state.textAreaValue === ''}
                style={{ float: 'right' }}
              >
                {lang['problem.submit']}
              </button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

ProblemModal.propTypes = {
  username: PropTypes.string.isRequired,
};
