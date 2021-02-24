import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assetIDs from '../character/sources/assetIDs.json';
import lang from '../../lang/de_DE.json';
import { SHIRTS, PANTS, HATS } from '../../js/constants';

export default class UnlockPreview extends Component {
  render() {
    let result = assetIDs
      .filter((asset) => asset.precondition['task-id'] === this.props.taskid)
      .sort((a, b) => {
        let order = [];
        if (a.attributes.includes('on-top') || b.attributes.includes('on-top'))
          order = [SHIRTS, PANTS, HATS];
        else order = [PANTS, SHIRTS, HATS];
        return order.indexOf(a.category) - order.indexOf(b.category);
      });
    let svg;
    result.forEach((asset) => {
      svg += '<g>' + asset.svg + '</g>';
    });
    let categories = '';
    this.props.categories.forEach((category) => {
      categories += `<li>${category}</li> `;
    });

    return (
      <div className="box">
        <h5 className="subtitle">{lang['unlockpreview.title']}</h5>
        <h6 className="mb-3">{lang['unlockpreview.title.categories']}</h6>
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
            <h6 className="mt-4 mb-3">{lang['unlockpreview.title.outfit']}</h6>
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
