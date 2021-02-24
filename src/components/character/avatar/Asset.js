import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assetIDs from '../sources/assetIDs.json';

export function getAttributesOf(assetID) {
  if (assetID === null || assetID === '') return [];
  if (assetIDs.find((el) => el.asset_id === assetID) === undefined) return [];
  return assetIDs.find((el) => el.asset_id === assetID).attributes;
}

export default class Asset extends Component {
  constructor(category) {
    super();
    this.category = category;
  }

  render() {
    console.log(assetIDs.filter((el) => el.id === this.props.id));
    if (assetIDs.filter((el) => el.id === this.props.id).length === 0) {
      console.log('HIER');
      return <div>Existiert nicht mehr!</div>;
    } else {
      console.log(this.props.id);
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
