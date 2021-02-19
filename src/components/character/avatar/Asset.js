import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assets from '../sources/assets.json';
import assetIDs from '../sources/assetIDs.json';

export function getAttributesOf(assetID) {
  if (assetID === null || assetID === '') return [];
  return assetIDs.find((el) => el.asset_id === assetID).attributes;
}

export default class Asset extends Component {
  constructor(category) {
    super();
    this.category = category;
  }

  render() {
    return (
      <React.Fragment>
        <g
          dangerouslySetInnerHTML={{
            __html: assets[this.category][this.props.id],
          }}
        />
      </React.Fragment>
    );
  }
}

Asset.propTypes = {
  id: PropTypes.string,
};
