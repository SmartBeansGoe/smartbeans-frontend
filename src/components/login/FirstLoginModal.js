import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import lang from '../../lang/de_DE.json';

export default class FirstLoginModal extends Component {
  state = {
    modalState: true,
  };
  render() {
    return (
      <Modal
        closeModal={() => {
          this.setState({ modalState: false });
        }}
        modalState={this.state.modalState}
        title={lang['firstlogin.title']}
        width="50%"
        footer={
          <footer className="modal-card-foot">
            <label
              className="checkbox"
              style={{
                flexGrow: 1,
              }}
            >
              <input
                type="checkbox"
                name="do-not-show-again"
                id="do-not-show-again"
              />{' '}
              {lang['firstlogin.do-not-show-again']}
            </label>
            <button
              className="button"
              onClick={() => {
                let checkbox = document.getElementById('do-not-show-again');
                if (checkbox.checked) {
                  this.props.setNoFirstLogin();
                }
                this.setState({ modalState: false });
              }}
              style={{
                textAlign: 'end',
              }}
            >
              {lang['firstlogin.close']}
            </button>
          </footer>
        }
      >
        <article
          dangerouslySetInnerHTML={{ __html: lang['firstlogin.message'] }}
        />
      </Modal>
    );
  }
}

FirstLoginModal.propTypes = {
  setNoFirstLogin: PropTypes.func.isRequired,
};
