import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Submission from './Submission';


export default class SubmissionOverview extends Component {
    state = {
        componentsHeight: 0
    }

    handler = (previousHeight, currentHeight) => {
        console.log("pre: ", previousHeight, "\tcur: ", currentHeight);
        console.log("height before: ", this.state.componentsHeight);
        this.setState({
            componentsHeight: this.state.componentsHeight - previousHeight + currentHeight,
        })
        console.log("height after: ", this.state.componentsHeight);
    }

    render() {
        return (
            <div className="is-child tile">
                <Card title="Versuche" componentHeight={this.state.componentsHeight} handler={this.handler}>
                    {() => (this.props.submissions.map((result, index) => (
                        <Submission
                            key={index}
                            id={index}
                            result={result}
                            handler={this.handler}
                        />
                    ))
                    )}
                </Card>
            </div >
        )
    }
}

SubmissionOverview.propTypes = {
    submissions: PropTypes.array.isRequired,
}
