import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LikertStatement extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.handleChange(this.props.id, event.target.value);
  }

  render() {
    let likertInputStyle = {
      display: 'block',
      position: 'relative',
      left: '50%',
      marginLeft: '-6px',
    };

    let likertLiStyle = {
      display: 'inline-block',
      width: 90 / this.props.numberAnswerOptions + '%',
      textAlign: 'center',
      marginTop: '10px',
      verticalAlign: 'top',
    };

    return (
      <div>
        <p className="title is-5">{this.props.statement}</p>
        <ul
          data-columns={this.props.numberAnswerOptions}
          className="likert"
          value={this.state.value}
          onChange={this.handleChange}
        >
          {[...Array(this.props.numberAnswerOptions)].map((_x, i) => (
            <li key={i} style={likertLiStyle}>
              <input
                style={likertInputStyle}
                type="radio"
                name="likert"
                value={i}
              />
              <label>
                {i === 0
                  ? 'Trifft nicht zu'
                  : i === this.props.numberAnswerOptions - 1
                  ? 'Trifft zu'
                  : ''}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

LikertStatement.propTypes = {
  id: PropTypes.number.isRequired,
  statement: PropTypes.string.isRequired,
  numberAnswerOptions: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
