import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AchievementList from '../achievements/AchievementList';
import { mdiCheckBold } from '@mdi/js';
import { Icon } from '@mdi/react';
import Bean from '../character/avatar/Bean';
import SkillGraph from './SkillGraph';
import { BLUE } from '../../js/constants';
import './Dashboard.css';
import lang from '../../lang/de_DE.json';
import WardrobeModal from './WardrobeModal';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      charname: this.props.charname,
      charnameSubmit: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
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
          className="tile flex-container is-10"
          style={{
            margin: 0,
          }}
        >
          <div
            className="tile is-parent is-vertical flex-item-left"
            style={{
              minWidth: '50%',
            }}
          >
            <div
              className="tile is-child box"
              style={{
                maxHeight: 175,
              }}
            >
              <p className="title">
                {lang['dashboard.level']} {this.props.level_data.level}{' '}
                {lang['dashboard.of']} {this.props.level_data.max_level}
              </p>
              <div className="progress-wrapper">
                <progress
                  className="progress is-large is-smart"
                  value={this.props.level_data.points}
                  max={this.props.level_data.next_points}
                />
                <p className="progress-value has-text-white">
                  {this.props.level_data.points}/
                  {this.props.level_data.next_points} {lang['dashboard.points']}
                </p>
              </div>
            </div>
            <div className="tile is-child box">
              <p className="title">{lang['dashboard.skills']}</p>
              <SkillGraph skills={this.props.level_data.skills} />
            </div>
          </div>

          <div className="tile is-parent is-vertical flex-item-right">
            <div className="tile is-vertical box">
              <p className="title">{lang['dashboard.achievements']}</p>
              <p className="subtitle">
                {lang['dashboard.achievements.unlocked']}
              </p>
              <AchievementList
                achievements={this.props.achievements}
                completed={true}
              />
              <p className="subtitle">
                {lang['dashboard.achievements.locked']}
              </p>
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
                <p className="title">Schwere Aufgabe</p>
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
            className="tile is-child box "
            onClick={this.toggleModal}
            style={{
              cursor: 'pointer',
              flex: 0,
              backgroundColor: BLUE,
            }}
          >
            <center>
              <p
                className="title is-4"
                style={{
                  color: 'white',
                }}
              >
                {lang['dashboard.wardrobe']}
              </p>
            </center>
          </article>
          <article
            className="tile is-child box"
            style={{
              flex: 0,
            }}
          >
            <p className="title is-4">{lang['dashboard.avatar-naming']}</p>
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
                  className="input"
                  type="text"
                  placeholder="Text input"
                  value={this.state.charname}
                  style={{ width: '140px', borderColor: BLUE }}
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
                  className="button is-smart"
                  disabled={!this.state.charnameSubmit}
                  type="submit"
                >
                  <div className="icon is-right">
                    <Icon path={mdiCheckBold} size={1} />
                  </div>
                </button>
              </form>
            </div>
          </article>
        </div>
        <WardrobeModal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          title={lang['wardrobe.name']}
          character={this.props.character}
          assets={this.props.assets}
          onSaveCharacterProperties={this.props.onSaveCharacterProperties}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  charname: PropTypes.string.isRequired,
  character: PropTypes.object.isRequired,
  assets: PropTypes.object.isRequired,
  achievements: PropTypes.array.isRequired,
  level_data: PropTypes.object.isRequired,
  onSaveCharacterProperties: PropTypes.func.isRequired,
  onSaveCharname: PropTypes.func.isRequired,
};
