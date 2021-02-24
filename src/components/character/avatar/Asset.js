import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assetIDs from '../sources/assetIDs.json';

export function getAttributesOf(assetID) {
  if (assetID === null || assetID === '') return [];
  return assetIDs.find((el) => el.id === assetID).attributes;
}

export default class Asset extends Component {
  constructor(category) {
    super();
    this.category = category;
  }

  render() {
    if (assetIDs.filter((el) => el.id === this.props.id).length === 0) {
      return <div>Existiert nicht mehr!</div>;
    } else {
      let svg = assetIDs.find((el) => el.id === this.props.id).svg;
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
