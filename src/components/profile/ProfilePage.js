import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadarChart from './RadarChart';
import AchievementList from '../achievements/AchievementList';

export default class ProfilePage extends Component {
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
      </div>
    );
  }
}

ProfilePage.propTypes = {
  charname: PropTypes.string.isRequired,
  achievements: PropTypes.object.isRequired,
};
