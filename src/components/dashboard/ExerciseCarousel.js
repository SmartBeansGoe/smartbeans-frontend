import React, { Component } from 'react'
import Glide from '@glidejs/glide'

export default class ExerciseCarousel extends Component {
  state = { id: null }

  componentDidMount = () => {
    // Generated random id 
    this.setState({ id: `glide-${Math.ceil(Math.random() * 100)}` }, this.initializeGlider)
  }

  initializeGlider = () => {
    this.slider = new Glide(`#${this.state.id}`, this.props.options)
    this.slider.mount()
  }

  componentWillReceiveProps = newProps => {
    if (this.props.options.startAt !== newProps.options.startAt) {
      this.slider.go(`=${newProps.options.startAt}`)
    }
  }

  render = () => (
    <div id={this.state.id} style={{ overflowX: 'hidden', userSelect: 'none', maxWidth: '100vw' }}>
      <div className="glide__track" data-glide-el="track">
        <div className="glide__slides" style={{ display: 'flex' }}>
          {this.props.children.map((slide, index) => {
            return React.cloneElement(slide, {
              key: index,
              className: `${slide.props.className} glide__slide`,
            })
          })}
        </div>
      </div>
    </div>
  )
}

ExerciseCarousel.defaultProps = {
  options: {},
}