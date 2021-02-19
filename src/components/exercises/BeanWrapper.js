import React, { Component } from 'react';
import Bean from '../character/avatar/Bean';
import ProblemModal from '../ProblemModal';
import UnlockPreview from '../exercises/UnlockPreview';
import PropTypes from 'prop-types';

export default class BeanWrapper extends Component {
  render() {
    return (
      <div className="tile is-vertical is-2 is-hidden-touch is-parent">
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
        <UnlockPreview
          taskid={this.props.taskid}
          categories={this.props.categories}
        />
        <ProblemModal taskid={this.props.taskid} />
      </div>
    );
  }
}

BeanWrapper.propTypes = {
  charname: PropTypes.string.isRequired,
  character: PropTypes.object.isRequired,
  taskid: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
};
