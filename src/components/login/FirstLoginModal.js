import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import lang from '../../lang/de_DE.json';
import bean from '../about/bean.png';

const NUM_LAYERS = 2;

export default class FirstLoginModal extends Component {
  state = {
    agreed: false,
    modalState: true,
    layerOnline: 0,
  };

  handleCheckedAgreement() {
    this.setState((state, props) => ({
      agreed: !state.agreed,
    }));
  }

  layer0() {
    return (
      <article className="is-size-5">
        <p>{lang['firstlogin.message-1']}</p>
        <div className="columns">
          <div className="column is-8">
            <ul>
              <li>{lang['firstlogin.message-1-a']}</li>
              <br />
              <li>{lang['firstlogin.message-1-b']}</li>
              <br />
              <li>{lang['firstlogin.message-1-c']}</li>
              <br />
            </ul>
          </div>
          <div className="column is-4">
            <center>
              <img src={bean} alt="" />
            </center>
          </div>
        </div>
      </article>
    );
  }

  layer2() {
    return (
      <article className="is-size-5">
        <p>{lang['firstlogin.privacy-policy-part-1']}</p>
        <ul>
          <li>{lang['firstlogin.privacy-policy-part-2-a']}</li>
          <li>{lang['firstlogin.privacy-policy-part-2-b']}</li>
          <li>{lang['firstlogin.privacy-policy-part-2-c']}</li>
        </ul>
        <p>{lang['firstlogin.privacy-policy-part-3']}</p>
      </article>
    );
  }

  layerTitle() {
    switch (this.state.layerOnline) {
      case 0:
        return lang['firstlogin.title-1'];
      case 1:
        return lang['firstlogin.title-2'];
      default:
        return null;
    }
  }

  layerOnline() {
    switch (this.state.layerOnline) {
      case 0:
        return this.layer0();
      case 1:
        return this.layer2();
      default:
        return null;
    }
  }

  nextLayer(next = true) {
    if (next) {
      if (this.state.layerOnline < NUM_LAYERS - 1) {
        this.setState((prev) => ({
          layerOnline: prev.layerOnline + 1,
        }));
      }
    } else {
      if (this.state.layerOnline > 0) {
        this.setState((prev) => ({
          layerOnline: prev.layerOnline - 1,
        }));
      }
    }
  }

  render() {
    return (
      <Modal
        closeModal={null}
        modalState={this.state.modalState}
        title={this.layerTitle()}
        width="50%"
        footer={
          <footer className="modal-card-foot">
            {this.state.layerOnline === NUM_LAYERS - 1 ? (
              <label
                className="checkbox"
                style={{
                  flexGrow: 1,
                }}
              >
                <input
                  type="checkbox"
                  name="opt-in-consent"
                  id="opt-in-consent"
                  checked={this.state.agreed}
                  onChange={() => this.handleCheckedAgreement()}
                />{' '}
                {lang['firstlogin.opt-in-consent-a']}{' '}
                <a
                  href={lang['firstlogin.opt-in-consent-b-link']}
                  target="_blank"
                  rel="noreferrer"
                >
                  {lang['firstlogin.opt-in-consent-b']}
                </a>{' '}
                {lang['firstlogin.opt-in-consent-c']}
              </label>
            ) : (
              <span
                style={{
                  flexGrow: 1,
                }}
              />
            )}
            {this.state.layerOnline === 0 ? null : (
              <button
                className="button"
                onClick={() => {
                  this.nextLayer(false);
                }}
                style={{
                  textAlign: 'end',
                }}
              >
                {lang['firstlogin.back']}
              </button>
            )}

            <button
              className="button"
              onClick={() => {
                this.nextLayer(true);
                if (this.state.layerOnline === NUM_LAYERS - 1) {
                  if (this.state.agreed) {
                    this.props.setNoFirstLogin();
                    this.setState({ modalState: false });
                  }
                }
              }}
              disabled={
                this.state.layerOnline === NUM_LAYERS - 1
                  ? !this.state.agreed
                  : false
              }
              style={{
                textAlign: 'end',
              }}
            >
              {this.state.layerOnline === NUM_LAYERS - 1
                ? lang['firstlogin.apply']
                : lang['firstlogin.next']}
            </button>
          </footer>
        }
      >
        {this.layerOnline()}
      </Modal>
    );
  }
}

FirstLoginModal.propTypes = {
  setNoFirstLogin: PropTypes.func.isRequired,
};
