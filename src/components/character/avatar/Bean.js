import React, { Component } from 'react';
import Body from './Body';
import Face from './Face';
import Shirt from './Shirt';
import Hat from './Hat';
import PropTypes from 'prop-types';
import Pants from './Pants';
import { getAttributesOf } from './Asset';

export default class Bean extends Component {
  render() {
    return (
      <div className="Bean">
        <svg
          width={this.props.width}
          height={this.props.height}
          version="1.1"
          viewBox="0 0 77.707 108.77"
        >
          <Body color={this.props.body_color} />
          <Face id={this.props.face_id} />

          {getAttributesOf(this.props.pants_id).includes('on-top') ? (
            <Shirt id={this.props.shirt_id} />
          ) : (
            ''
          )}
          {getAttributesOf(this.props.shirt_id).includes('no-pants') ? (
            <Pants id={null} />
          ) : (
            <Pants id={this.props.pants_id} />
          )}
          {getAttributesOf(this.props.pants_id).includes('on-top') ? (
            ''
          ) : (
            <Shirt id={this.props.shirt_id} />
          )}
          <Hat id={this.props.hat_id} />
        </svg>
      </div>
    );
  }
}

Bean.propTypes = {
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  body_color: PropTypes.string.isRequired,
  face_id: PropTypes.string.isRequired,
  hat_id: PropTypes.string,
  pants_id: PropTypes.string,
  shirt_id: PropTypes.string,
};
