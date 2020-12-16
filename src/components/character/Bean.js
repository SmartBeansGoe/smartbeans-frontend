import React, { Component } from 'react'
import Body from './Body'
import Face from './Face'
import Shirt from './Shirt'
import PropTypes from 'prop-types'


export default class Bean extends Component {
  render() {
    return (
      <div className="Bean">
        <svg
          viewBox="0 40 210 227"
          width={this.props.scale}
          height="auto"
        >
          <Body color={this.props.body_color}/>
          <Face/>
          <Shirt/>
        </svg>
      </div>
    )
  }
}

Bean.propTypes = {
  body_color: PropTypes.string.isRequired,
}
