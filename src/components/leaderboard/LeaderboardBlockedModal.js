import React, { Component } from 'react';
import { Modal } from '../Modal';
import lang from '../../lang/de_DE.json';

export default class LeaderboardBlockedModal extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal
          closeModal={this.props.closeModal}
          modalState={this.props.modalState}
          title={lang['leaderboard.blocked.modal.title']}
          height={'300'}
          width={'600'}
        >
          <p>{lang['leaderboard.blocked.modal.description']}</p>
        </Modal>
      </React.Fragment>
    );
  }
}
