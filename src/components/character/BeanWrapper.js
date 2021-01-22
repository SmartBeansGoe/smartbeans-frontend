import React, { Component } from 'react'
import Bean from './Bean';

export default class BeanWrapper extends Component {
  render() {
    return (
      <div
        className="tile is-vertical is-2 is-hidden-touch is-parent"
        style={{ marginLeft: 0, paddingLeft: 0 }}
      >
        <div className="tile is-child box" style={{ flex: 0 }}>
          <p className="title has-text-centered has-background-success-light">
            {this.props.charname}
          </p>
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
      </div>
    )
  }
}
