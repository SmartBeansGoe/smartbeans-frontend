import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Modal } from '../Modal';
import lang from '../../lang/de_DE.json';

export default class ProblemModal extends Component {
  constructor() {
    super();
    this.state = {
      textAreaValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
  }

  clearInput() {
    this.setState({
      textAreaValue: ""
    })
  }

  reportProblem = () => {
    // console.log("text: ", this.state.textAreaValue);
    // console.log("id: ", this.props.taskid);
    // axios_inst.post().then();
    this.clearInput();
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        closeModal={this.props.closeModal}
        modalState={this.props.modalState}
        title={lang['exercise.problem.report']}
        height={"300"}
        width={"600"}
        clearInput={this.clearInput}
      >
        <div>
          <h5>
            {lang['exercise.problem.messageprompt']}
          </h5>
          <div>
            <textarea
              value={this.state.textAreaValue}
              onChange={this.handleChange}
              rows={6}
              style={{ width: "100%" }}
            >
            </textarea>
          </div>
          <div className="mt-3">
            <button className="button is-light" onClick={this.props.closeModal}>
              {lang['exercise.problem.abort']}
            </button>
            <button className="button is-link" onClick={this.reportProblem} disabled={this.state.textAreaValue === ""}
              style={{ float: "right" }}>
              {lang['exercise.problem.submit']}
            </button>
          </div>

        </div>
      </Modal>
    );
  }
}

ProblemModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired,
  taskid: PropTypes.number,
};
