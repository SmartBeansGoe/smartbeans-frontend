import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assets from '../character/sources/assets.json';
import assetIDs from '../character/sources/assetIDs.json';

export default class UnlockPreview extends Component {
  render() {
    // Version für später
    // let result = assetIDs.filter(
    //   (asset) => asset.precondition.taskId === this.props.taskid
    // );
    // Version für jetzt
    let result = assetIDs.filter(
      (asset) => asset.precondition === this.props.taskid
    );
    // svg zusammensetzten
    let svg;
    result.forEach((asset) => {
      svg += '<g>';
      svg += assets[asset.category][asset.asset_id];
      svg += '</g>';
    });
    let categories = '';
    this.props.categories.forEach((category) => {
      categories += `<li>${category}</li> `;
    });

    return (
      <div className="box">
        <h5 className="subtitle">Durch das Lösen der Aufgabe erhälst du ...</h5>
        <h6 className="mb-3">Erfahrungspunkte in:</h6>
        <ul
          style={{
            width: '100px',
            paddingLeft: '10px',
            paddingTop: '5px',
            paddingBottom: '5px',
            marginLeft: '10px',
            backgroundColor: 'whitesmoke',
          }}
          dangerouslySetInnerHTML={{ __html: categories }}
        />
        {svg !== undefined && (
          <React.Fragment>
            <h6 className="mt-4 mb-3">Outfit:</h6>
            <div style={{ textAlign: 'center' }}>
              <svg
                viewBox="0 0 77.707 108.77"
                height={150}
                width="auto"
                dangerouslySetInnerHTML={{
                  __html: svg,
                }}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

UnlockPreview.propTypes = {
  taskid: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
};
