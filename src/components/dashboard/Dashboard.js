import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AchievementList from '../achievements/AchievementList';
import { mdiCheckBold, mdiCheckCircleOutline, mdiRefresh } from '@mdi/js';
import { Icon } from '@mdi/react';
import Bean from '../character/avatar/Bean';
import SkillGraph from './SkillGraph';
import { BLUE, LIGHTBLUE } from '../../js/constants';
import './Dashboard.css';
import lang from '../../lang/de_DE.json';
import WardrobeModal from './WardrobeModal';
import {
  getExerciseByCategories,
  EASY,
  MEDIUM,
  HARD,
  EXAM,
} from '../exercises/ExerciseOverviewPage';
import { Link } from 'react-router-dom';

function getRandomExercise(exercises, solved = false) {
  return exercises
    .filter((el) => el.solved === solved)
    .sort(() => Math.random() - 0.5)[0];
}

function renderNextExercise(exercise, difficulty) {
  let solved = exercise === undefined;
  return (
    <div
      className="tile is-parent"
      style={{
        cursor: solved ? 'default' : 'pointer',
        minWidth: '350px',
        maxWidth: '25%',
      }}
    >
      {solved ? (
        <div
          className="tile columns is-child box"
          style={{
            border: 'solid',
            borderWidth: '0.4em',
            borderColor: LIGHTBLUE,
          }}
          title={lang['exercise.next.all.ready']}
        >
          <div className="column is-10">
            <p className="title is-4">
              {lang['exercise.next.' + difficulty + '.ready']}
            </p>
            <p className="subtitle is-6">{lang['exercise.next.all.ready']}</p>
          </div>
          <div className="column is-2">
            <Icon
              path={mdiCheckCircleOutline}
              size={2.0}
              style={{ color: BLUE }}
            />
          </div>
        </div>
      ) : (
        <Link
          className="tile is-child box"
          style={{
            border: 'solid',
            borderWidth: '0.4em',
            borderColor: LIGHTBLUE,
          }}
          to={'/exercises/' + exercise.taskid}
        >
          <p className="title is-4">
            {lang['exercise.next.' + difficulty + '.title']}
          </p>
          <p className="subtitle">{exercise.name}</p>
        </Link>
      )}
    </div>
  );
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      charname: this.props.charname,
      charnameSubmit: false,
      recommendations: {},
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.updateExerciseRecommendations();
  }

  updateExerciseRecommendations() {
    let categories = getExerciseByCategories(this.props.exercises);
    let easyExercise = getRandomExercise(
      categories.find((c) => c.id === EASY).exerciseList
    );
    let mediumExercise = getRandomExercise(
      categories.find((c) => c.id === MEDIUM).exerciseList
    );
    let hardExercise = getRandomExercise(
      categories.find((c) => c.id === HARD).exerciseList
    );
    let examExercise = getRandomExercise(
      categories.find((c) => c.id === EXAM).exerciseList
    );
    this.setState({
      recommendations: {
        easyExercise: easyExercise,
        mediumExercise: mediumExercise,
        hardExercise: hardExercise,
        examExercise: examExercise,
      },
    });
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

          <div className="tile is-parent">
            <div className="tile is-child box">
              <div className="flex-container">
                <span className="title" style={{ flexGrow: 1 }}>
                  {lang['dashboard.exercise-recommendations']}
                </span>
                <Icon
                  path={mdiRefresh}
                  size={1.5}
                  onClick={() => this.updateExerciseRecommendations()}
                  style={{ cursor: 'pointer', color: BLUE }}
                />
              </div>
              <div
                className="tile"
                style={{
                  display: 'flex',
                  flexFlow: 'row wrap',
                }}
              >
                {renderNextExercise(
                  this.state.recommendations.easyExercise,
                  EASY
                )}
                {renderNextExercise(
                  this.state.recommendations.mediumExercise,
                  MEDIUM
                )}
                {renderNextExercise(
                  this.state.recommendations.hardExercise,
                  HARD
                )}
                {renderNextExercise(
                  this.state.recommendations.examExercise,
                  EXAM
                )}
              </div>
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
  assets: PropTypes.array.isRequired,
  achievements: PropTypes.array.isRequired,
  level_data: PropTypes.object.isRequired,
  exercises: PropTypes.array.isRequired,
  onSaveCharacterProperties: PropTypes.func.isRequired,
  onSaveCharname: PropTypes.func.isRequired,
};
