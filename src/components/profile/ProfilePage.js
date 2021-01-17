import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadarChart from './RadarChart';
import AchievementList from '../achievements/AchievementList';
import CharacterBuildingPage from '../character/CharacterBuildingPage';
import { Modal } from './Modal';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.onSaveCharacterProperties = this.props.onSaveCharacterProperties.bind(
      this
    );
  }

  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;

      return { modalState: newState };
    });
  }

  render() {
    return (
      <div className="tile is-vertical">
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <article className="tile is-child notification box">
              <p className="title">Level</p>
            </article>
            <article className="tile is-child notification box">
              <p className="title">Fähigkeiten</p>
              <RadarChart
                title=""
                // TODO: Backend get request is needed for category_skill_values and titles.
                category_skill_titles={[
                  'IO',
                  'STRING',
                  'DATA',
                  'CONTROL',
                  'MATH',
                  'POINTER',
                  'ARRAYS',
                  'MEMORY',
                  'MODULE',
                  'STRUCTS',
                ]}
                category_skill_values={[5, 3, 6, 3, 7, 2, 7, 3, 9, 3]}
              />
            </article>
          </div>
          <div className="tile is-parent">
            <div className="tile notification is-vertical box">
              <p className="title">Triumphe</p>
              <article className="tile is-child box">
                <p className="subtitle">Alle freigeschaltenen Erfolge</p>
                <AchievementList
                  achievements={this.props.achievements}
                  completed={true}
                />
              </article>
              <article className="tile is-child box">
                <p className="subtitle">Noch freizuschaltene Erfolge</p>
                <AchievementList
                  achievements={this.props.achievements}
                  completed={false}
                />
              </article>
            </div>
          </div>
        </div>
        <div className="tile">
          <div className="tile is-parent">
            <article
              className="tile is-child notification box"
              style={{
                cursor: 'pointer',
              }}
            >
              <p className="title">Nächste Aufgabe</p>
              <p className="subtitle">Titel der Aufgabe</p>
              <div className="content"></div>
            </article>
          </div>
          <div className="tile is-parent">
            <article
              className="tile is-child notification is-danger box"
              onClick={this.toggleModal}
              style={{
                cursor: 'pointer',
              }}
            >
              <p className="title">Avatar bearbeiten</p>
              <p className="subtitle"></p>
              <div className="content"></div>
            </article>
          </div>
        </div>
        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          title="Umkleide"
        >
          <CharacterBuildingPage
            body_color={this.props.character.body_color}
            face_id={this.props.character.face_id}
            pants_id={this.props.character.pants_id}
            shirt_id={this.props.character.shirt_id}
            hat_id={this.props.character.hat_id}
            assets={this.props.assets}
            onSaveCharacterProperties={this.onSaveCharacterProperties}
          />
        </Modal>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  charname: PropTypes.string.isRequired,
  character: PropTypes.object.isRequired,
  assets: PropTypes.object.isRequired,
  achievements: PropTypes.object.isRequired,
  onSaveCharacterProperties: PropTypes.func.isRequired,
};
