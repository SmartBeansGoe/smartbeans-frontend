import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Modal } from '../Modal';
import Wardrobe from '../character/Wardrobe';
import lang from '../../lang/de_DE.json';

export default class WardrobeModal extends Component {
  render() {
    return (
      <Modal
        closeModal={this.props.closeModal}
        modalState={this.props.modalState}
        title={lang['wardrobe.name']}
      >
        <Wardrobe
          body_color={this.props.character.body_color}
          face_id={this.props.character.face_id}
          pants_id={this.props.character.pants_id}
          shirt_id={this.props.character.shirt_id}
          hat_id={this.props.character.hat_id}
          assets={this.props.assets}
          onSaveCharacterProperties={this.props.onSaveCharacterProperties}
        />
      </Modal>
    );
  }
}

WardrobeModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired,
  character: PropTypes.object.isRequired,
  assets: PropTypes.array.isRequired,
  onSaveCharacterProperties: PropTypes.func.isRequired,
};
