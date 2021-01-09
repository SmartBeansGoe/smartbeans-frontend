import React, { Component } from "react"
import PropTypes from 'prop-types';

export default class Submission extends Component {
    componentDidMount() {
    }

    render() {
        return (<div>Versuch {this.props.id} <p>{this.props.submission.sourceCode}</p> </div>)
    }
}

Submission.propTypes = {
    id: PropTypes.number.isRequired,
    submission: PropTypes.object.isRequired,
}
