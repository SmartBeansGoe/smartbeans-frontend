import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { Icon } from '@mdi/react';

export default class Submission extends Component {
    state = {
        isOpen: false,
        duration: "1s"
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    };

    render() {
        return (
            <React.Fragment>
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">Versuch {this.props.id}</p>
                        <a className="card-header-icon" onClick={this.toggle} >
                            <span className="icon">
                                <Icon path={this.state.isOpen ? mdiChevronUp : mdiChevronDown} />
                            </span>
                        </a>
                    </header>
                    <Collapse isOpened={this.state.isOpen}>
                        <div className="card-content">
                            <h1 className="title is-6">Quelltext</h1>
                            <pre><code className="quelltext"></code></pre>
                            <h1 className="title is-6">Ausgabe des Compliers</h1>
                            <p></p>
                            <h1 className="title is-6">Feedback</h1>
                            <p></p>
                        </div>
                    </Collapse>
                </div>
            </React.Fragment>)
    }
}

Submission.propTypes = {
    id: PropTypes.number.isRequired,
    submission: PropTypes.object.isRequired,
}
