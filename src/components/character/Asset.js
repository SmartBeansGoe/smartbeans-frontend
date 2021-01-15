import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import assets from './sources/assets.json'

export default class Asset extends Component {
  constructor(category) {
    super();
    this.category = category;
  }

  componentDidMount() {
    this.setAsset();
  }

  componentDidUpdate() {
    this.setAsset();
  }

  setAsset() {
    var svg = document.getElementById(this.category);
    var as = assets[this.category];
    if (svg !== null && this.props.id !== "") {
      if (as !== undefined) {
        if (as[this.props.id] !== undefined)
          svg.innerHTML = as[this.props.id];
        else {
          svg.innerHTML = "";
        }
      }
      else {
        svg.innerHTML = "";
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <g id={this.asset}></g>
      </React.Fragment>
    )
  }
}


Asset.propTypes = {
  id: PropTypes.string.isRequired,
}

