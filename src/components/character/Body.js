import React, { Component } from 'react'

export default class Body extends Component {
  render() {
    return (
      <g>
        <ellipse
          fill={this.props.color}
          id="debug_thomas"
          cx="105.63578"
          cy="149.05804"
          rx="52.452663"
          ry="71.488609" />
      </g>
    )
  }
}
