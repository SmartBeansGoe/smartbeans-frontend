import React, { Component } from 'react'
import Body from './Body'
import Face from './Face'
import Shirt from './Shirt'
import Hat from './Hat'
import PropTypes from 'prop-types'
import Pants from './Pants'


export default class Bean extends Component {
  render() {
    return (
      <div className="Bean">
        <svg width={this.props.width} height={this.props.height} version="1.1" viewBox="0 0 77.707 108.77">
          <Body color={this.props.body_color}/>
          <Face id ={this.props.face_id}/>
          <Hat id={this.props.hat_id}/>
          <Pants id={this.props.pants_id}/>
          <Shirt id={this.props.shirt_id}/>
        </svg>
      </div>
    )
  }
}

Bean.propTypes = {
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  body_color: PropTypes.string.isRequired,
  face_id: PropTypes.string.isRequired,
  hat_id: PropTypes.string.isRequired,
  pants_id: PropTypes.string.isRequired,
  shirt_id: PropTypes.string.isRequired,
}
