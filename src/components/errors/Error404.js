import React from 'react';
import lang from '../../lang/de_DE.json';
import { BLUE } from '../../js/constants';
import axios_inst from '../../js/backend';

export default function Error404() {
  axios_inst
    .post('/achievements/404')
    .catch((error) => this.props.handleError(error));
  return (
    <div className="tile">
      <div className="tile is-parent is-10">
        <article className="tile is-child box">
          <p className="title">{lang['error.404.title']}</p>
          <p className="subtitle">{lang['error.404.message']}</p>
        </article>
      </div>
      <div className="tile is-parent is-2">
        <article className="tile is-child box">
          <svg viewBox="20 20 190 277" version="1.1">
            <g>
              <ellipse
                style={{
                  fill: BLUE,
                  fillRule: 'evenodd',
                  strokeWidth: 0.264583,
                }}
                id="path10"
                cx="105.63578"
                cy="149.05804"
                rx="52.452663"
                ry="71.488609"
              />
            </g>
            <g>
              <ellipse
                style={{ fill: '#000000', strokeWidth: 0.264583 }}
                id="path90"
                cx="80.957985"
                cy="94.239716"
                rx="7.9174061"
                ry="7.5378032"
              />
              <ellipse
                style={{ fill: '#000000', strokeWidth: 0.264583 }}
                id="path92"
                cx="132.67834"
                cy="93.337196"
                rx="12.247429"
                ry="12.301517"
              />
              <ellipse
                style={{ fill: '#000000', strokeWidth: 0.264583 }}
                id="path94"
                cx="101.6119"
                cy="140.84663"
                rx="40.719944"
                ry="10.17682"
              />
            </g>
          </svg>
        </article>
      </div>
    </div>
  );
}
