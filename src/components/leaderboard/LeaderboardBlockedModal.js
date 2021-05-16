import React, { Component } from 'react';
import { Modal } from '../Modal';
import lang from '../../lang/de_DE.json';
import { LEADERBOARD_UNLOCK } from '../../js/constants';

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
          <p>
            {lang['leaderboard.blocked.modal.description-1'] +
              LEADERBOARD_UNLOCK +
              lang['leaderboard.blocked.modal.description-2']}
          </p>
        </Modal>
      </React.Fragment>
    );
  }
}
