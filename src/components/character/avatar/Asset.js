import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assets from '../../../data/assets.json'

export function getAttributesOf(assetID) {
  if (assetID === null || assetID === '') return [];
  return assets.find((el) => el.id === assetID).attributes;
}

export default class Asset extends Component {
  constructor(category) {
    super();
    this.category = category;
  }

  render() {
    if (assets.filter((el) => el.id === this.props.id).length === 0) {
      return null;
    } else {
      let svg = assets.find((el) => el.id === this.props.id).svg;
      return (
        <React.Fragment>
          <g
            dangerouslySetInnerHTML={{
              __html: svg,
            }}
          />
        </React.Fragment>
      );
    }
  }
}

Asset.propTypes = {
  id: PropTypes.string,
};
