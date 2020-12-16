import React, { Component } from 'react'
import image from './sources/Bohne.png'

export default class Bean extends Component {
  render() {
    return (
      <div className="Bean">
        <img src={ image } />
      </div>
    )
  }
}
