import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadarChart from './RadarChart';
import AchievementList from '../achievements/AchievementList';
import CharacterBuildingPage from '../character/CharacterBuildingPage';
import { Modal } from './Modal';
import { mdiCheckBold } from '@mdi/js';
import { Icon } from '@mdi/react';
import Bean from '../character/avatar/Bean';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      charname: this.props.charname,
      charnameSubmit: false,
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
      <div className="tile">
        <div
          className="tile"
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
          }}
        >
          <div
            className="tile is-parent is-vertical"
            style={{
              minWidth: '50%',
            }}
          >
            <article className="tile is-child box">
              <p className="title">Level 1</p>
              <div className="progress-wrapper">
                <progress
                  className="progress is-danger is-large"
                  value="650"
                  max="1000"
                />
                <p className="progress-value has-text-white">650/1000 Punkte</p>
              </div>
            </article>
            <article className="tile is-child box">
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

          <div
            className="tile is-parent is-vertical"
            style={{
              minWidth: '50%',
            }}
          >
            <div className="tile is-vertical box">
              <p className="title">Triumphe</p>
              <p className="subtitle">Alle freigeschaltenen Erfolge</p>
              <AchievementList
                achievements={this.props.achievements}
                completed={true}
              />
              <p className="subtitle">Noch freizuschaltene Erfolge</p>
              <AchievementList
                achievements={this.props.achievements}
                completed={false}
              />
            </div>
          </div>

          <div
            className="tile"
            style={{
              display: 'flex',
              flexFlow: 'row wrap',
            }}
          >
            <div
              className="tile is-parent"
              style={{
                cursor: 'pointer',
                minWidth: '300px',
              }}
            >
              <article className="tile is-child box">
                <p className="title">Leichte Aufgabe</p>
                <p className="subtitle">Titel der Aufgabe</p>
              </article>
            </div>
            <div
              className="tile is-parent"
              style={{
                cursor: 'pointer',
                minWidth: '300px',
              }}
            >
              <article className="tile is-child box">
                <p className="title">Mittlere Aufgabe</p>
                <p className="subtitle">Titel der Aufgabe</p>
              </article>
            </div>
            <div
              className="tile is-parent"
              style={{
                cursor: 'pointer',
                minWidth: '300px',
              }}
            >
              <article className="tile is-child box">
                <p className="title">Klausurniveau Aufgabe</p>
                <p className="subtitle">Titel der Aufgabe</p>
              </article>
            </div>
            <div
              className="tile is-parent"
              style={{
                cursor: 'pointer',
                minWidth: '300px',
              }}
            >
              <article className="tile is-child box">
                <p className="title">Schwere Aufgabe</p>
                <p className="subtitle">Titel der Aufgabe</p>
              </article>
            </div>
          </div>
        </div>

        <div className="tile is-vertical is-parent is-2">
          <div className="tile is-child box" style={{ flex: 0 }}>
            <p className="title has-text-centered">{this.props.charname}</p>
            <Bean
              width="auto"
              height="auto"
              body_color={this.props.character.body_color}
              face_id={this.props.character.face_id}
              pants_id={this.props.character.pants_id}
              hat_id={this.props.character.hat_id}
              shirt_id={this.props.character.shirt_id}
            />
          </div>
          <article
            className="tile is-child is-danger box"
            onClick={this.toggleModal}
            style={{
              cursor: 'pointer',
              flex: 0,
            }}
          >
            <center>
              <p className="title">Avatar umkleiden</p>
            </center>
          </article>
          <article
            className="tile is-child box"
            style={{
              flex: 0,
            }}
          >
            <p className="title">Avatarname</p>
            <div
              className="control"
              style={{
                display: 'flow',
              }}
            >
              <form
                onSubmit={() => this.props.onSaveCharname(this.state.charname)}
              >
                <input
                  className="input is-danger"
                  type="text"
                  placeholder="Text input"
                  value={this.state.charname}
                  style={{ width: '140px' }}
                  maxLength={15}
                  onChange={(event) => {
                    this.setState({
                      charname: event.target.value,
                      charnameSubmit:
                        event.target.value !== this.props.charname,
                    });
                  }}
                />
                <button
                  className="button is-danger"
                  disabled={!this.state.charnameSubmit}
                  type="submit"
                >
                  <div className="icon is-right ">
                    <Icon path={mdiCheckBold} size={1} />
                  </div>
                </button>
              </form>
            </div>
          </article>
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
  achievements: PropTypes.array.isRequired,
  onSaveCharacterProperties: PropTypes.func.isRequired,
  onSaveCharname: PropTypes.func.isRequired,
};
