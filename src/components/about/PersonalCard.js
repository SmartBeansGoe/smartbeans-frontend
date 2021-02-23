import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PersonalCard extends Component {
  constructor(props) {
    super(props);
  }

  displayDescription() {
    let alignment = this.props.leftAlign ? 'left' : 'right';
    return (
      <div className="column is-8">
        <p style={{ textAlign: alignment }}>
          <span className="title is-5">{this.props.name}</span>
          <br />
          <span style={{ fontStyle: 'italic' }}>{this.props.job}</span>
        </p>
        <p style={{ textAlign: alignment }}>{this.props.description}</p>
      </div>
    );
  }

  displaySVG() {
    let alignment = this.props.leftAlign ? 'right' : 'left';
    return (
      <div className="column is-4" style={{textAlign: alignment}}>
        <svg
          viewBox="0 0 77.706579 108.77032"
          height="200px"
          dangerouslySetInnerHTML={{ __html: this.props.svg }}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="columns">
        {this.props.leftAlign ? (
          <React.Fragment>
            {this.displaySVG()}
            {this.displayDescription()}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.displayDescription()}
            {this.displaySVG()}
          </React.Fragment>
        )}
      </div>
    );
  }
}

PersonalCard.propTypes = {
  name: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  svg: PropTypes.string.isRequired,
  leftAlign: PropTypes.bool.isRequired,
};
