import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import assets from './sources/assets.json'

export default class Asset extends Component {
  constructor(asset) {
    super();
    this.asset = asset;
  }

  componentDidMount() {
    this.setAsset();
  }

  componentDidUpdate() {
    this.setAsset();
  }

  setAsset() {
    var svg = document.getElementById(this.asset);
    var as = assets[this.asset];
    if (svg != null) {
      if (as !== undefined) {
        if (as[this.props.id] !== undefined)
          svg.innerHTML = as[this.props.id];
        else {
          svg.innerHTML = as["default"];
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

