import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assets from '../character/sources/assets.json';
import assetIDs from '../character/sources/assetIDs.json';

export default class UnlockPreview extends Component {
  render() {
    let result = assetIDs.filter(asset => asset.precondition === this.props.taskid);
    let svg;
    if (result.length !== 0) {
      let asset = result[0];
      svg = assets[asset.category][asset.asset_id];
    }
    let categories = ""
    this.props.categories.forEach(category => { categories += `<li>${category}</li>` });

    return (
      <div className="box">
        <h5 className="subtitle">
          Durch das Lösen der Aufgabe bekommts du
        </h5>
        <h6 className="subtitle is-6">
          Fähigkeitenzuwachs in Kategorie:
        </h6>
        <ul dangerouslySetInnerHTML={{ __html: categories }}>
        </ul>
        {svg !== undefined &&
          <React.Fragment>
            <h6 className="subtitle is-6">
              Neue Kleidungsstücke:
            </h6>
            <svg
              viewBox="0 0 77.707 108.77"
              height={150}
              width="auto"
              dangerouslySetInnerHTML={{
                __html: svg,
              }}
            />
          </React.Fragment>
        }
      </div>
    )
  }
}

UnlockPreview.propTypes = {
  taskid: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
};