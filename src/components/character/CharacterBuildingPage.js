import React, { Component } from 'react'
import Bean from './Bean'
import PropTypes from 'prop-types'


export default class CharacterBuildingPage extends Component {
  constructor(props) {
    super(props);
    this.handleChangeBodyColor = this.handleChangeBodyColor.bind(this);
  }

  handleChangeBodyColor(e) {
    this.props.onBodyColorChange(e.target.value);
  }
  render() {
    return (
      <React.Fragment>
      <div className="tile is-parent">
        <div className="tile is-child box">
          <Bean scale="80%" body_color={this.props.body_color} shirt_id="irgendeine ID" />
        </div>
      </div>
      <div className="tile is-parent">
        <div className="tile is-child box">
          <input className="button" type="color" id="body" name="body" value={this.props.body_color} onChange={(event) => this.handleChangeBodyColor(event)}/>
          <label className="label" htmlFor="body">BodyColor</label>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

CharacterBuildingPage.propTypes = {
  body_color: PropTypes.string.isRequired,
  onBodyColorChange: PropTypes.func.isRequired,
}

