import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Submission from './Submission';


export default class SubmissionOverview extends Component {
    render() {
        return (
            <div className="is-child tile">
                <Card title="Versuche">
                    {() => (this.props.submissions.map((result, index) => (
                        <Submission
                            key={index}
                            id={index}
                            result={result}
                        />
                    )))}
                </Card>
            </div >
        )
    }
}

SubmissionOverview.propTypes = {
    submissions: PropTypes.array.isRequired,
}
