import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default class Submission extends Component {
    state = {
        componentHeight: 0,
    }

    handler = (previousHeight, currentHeight) => {
        this.setState({
            componentHeight: currentHeight
        });
        this.props.handler(previousHeight, currentHeight);
    }

    render() {
        return (
            <React.Fragment>
                <Card title={`Versuch ${this.props.id}`} componentHeight={this.state.componentHeight} handler={this.handler}>
                    {() => (
                        <React.Fragment>
                            <h1 className="title is-6">Quelltext</h1>
                            <pre><code className="quelltext"></code></pre>
                            <h1 className="title is-6">Ausgabe des Compliers</h1>
                            <p className="compiler">
                            </p>
                            <h1 className="title is-6">Feedback</h1>
                            <p className="feedback"></p>
                        </React.Fragment>)
                    }
                </Card>
            </React.Fragment>
        )
    }
}

Submission.propTypes = {
    id: PropTypes.number,
    result: PropTypes.object,
}
