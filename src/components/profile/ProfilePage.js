import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ProfilePage extends Component {
  render() {
    return <div className="tile is-parent is-vertical box"></div>;
  }
}

ProfilePage.propTypes = {
  charname: PropTypes.string.isRequired,
};
