import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExerciseCategoryOverview from './ExerciseCategoryOverview';
import lang from '../../../lang/de_DE.json';
import Bean from '../../character/avatar/Bean';

export const SUPEREASY = 'sehr einfach';
export const EASY = 'einfach';
export const MEDIUM = 'mittel';
export const HARD = 'schwierig';
export const EXAM = 'klausur';

export function getExerciseByDifficulty(exercises) {
  const iron = exercises.filter((el) => el.difficulty === SUPEREASY);
  const bronze = exercises.filter((el) => el.difficulty === EASY);
  const silver = exercises.filter((el) => el.difficulty === MEDIUM);
  const gold = exercises.filter((el) => el.difficulty === HARD);
  const platin = exercises.filter((el) => el.difficulty === EXAM);
  let categories = [
    {
      id: SUPEREASY,
      title: lang['exercise.category.supereasy.title'],
      subtitle: lang['exercise.category.supereasy.subtitle'],
      exerciseList: iron,
    },
    {
      id: EASY,
      title: lang['exercise.category.easy.title'],
      subtitle: lang['exercise.category.easy.subtitle'],
      exerciseList: bronze,
    },
    {
      id: MEDIUM,
      title: lang['exercise.category.medium.title'],
      subtitle: lang['exercise.category.medium.subtitle'],
      exerciseList: silver,
    },
    {
      id: HARD,
      title: lang['exercise.category.hard.title'],
      subtitle: lang['exercise.category.hard.subtitle'],
      exerciseList: gold,
    },
    {
      id: EXAM,
      title: lang['exercise.category.exam.title'],
      subtitle: lang['exercise.category.exam.subtitle'],
      exerciseList: platin,
    },
  ];
  return categories;
}

export default class ExerciseOverviewPage extends Component {
  render() {
    let hasTags = true;
    let exercises = this.props.exercises;
    let categories = getExerciseByDifficulty(exercises).filter(
      (c) => c.exerciseList.length > 0
    );
    return (
      <React.Fragment>
        <div
          className="tile"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((c, index) => {
            if (index % 2 === 0 && index === categories.length - 1) {
              return (
                <React.Fragment key={'category-' + index}>
                  <div className={'tile is-parent flex-item-left'}>
                    <ExerciseCategoryOverview
                      title={c.title}
                      subtitle={c.subtitle}
                      exerciseList={c.exerciseList}
                      hasTags={hasTags}
                    />
                  </div>
                  <div
                    key={'category-empty'}
                    className={'tile is-parent flex-item-right'}
                  ></div>
                </React.Fragment>
              );
            }
            return (
              <div
                key={'category-' + index}
                className={
                  'tile is-parent ' +
                  (index % 2 === 0 ? 'flex-item-left' : 'flex-item-right')
                }
              >
                <ExerciseCategoryOverview
                  title={c.title}
                  subtitle={c.subtitle}
                  exerciseList={c.exerciseList}
                  hasTags={hasTags}
                />
              </div>
            );
          })}
        </div>
        <div className="tile is-vertical is-2 is-hidden-touch is-parent">
          <div className="tile is-child box" style={{ flex: 0 }}>
            <p className="title has-text-centered">{this.props.charname}</p>
            <Bean
              body_color={this.props.character.body_color}
              face_id={this.props.character.face_id}
              pants_id={this.props.character.pants_id}
              hat_id={this.props.character.hat_id}
              shirt_id={this.props.character.shirt_id}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ExerciseOverviewPage.propTypes = {
  exercises: PropTypes.array.isRequired,
  charname: PropTypes.string.isRequired,
  character: PropTypes.object.isRequired,
};
