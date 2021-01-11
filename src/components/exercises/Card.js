import React, { Component } from "react";
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { Icon } from '@mdi/react';
import "./Card.css";

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.submissionRef = React.createRef();
        this.cardRef = React.createRef();
    }

    state = {
        isOpen: false,
        isActive: "",
        contentHeight: 0,
    }

    componentDidMount() {
        this.props.handler(0, this.cardRef.current.scrollHeight);
    }

    toggle = () => {

        this.setState({
            isOpen: !this.state.isOpen,
            isActive: !this.state.isOpen ? "active" : "",
            contentHeight: !this.state.isOpen ? this.submissionRef.current.scrollHeight : 0
        })
        this.props.handler(this.state.contentHeight, !this.state.isOpen ? this.submissionRef.current.scrollHeight : 0)
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <div className="card" ref={this.cardRef}>
                    <header className={`card-header ${this.state.isActive}`} onClick={this.toggle}>
                        <p className="card-header-title">{this.props.title}</p>
                        <div className="card-header-icon"  >
                            <span className="icon">
                                <Icon path={this.state.isOpen ? mdiChevronUp : mdiChevronDown} />
                            </span>
                        </div>
                    </header>
                    <div className="toCollapse" ref={this.submissionRef} style={{ maxHeight: `${this.state.isOpen ? this.props.componentHeight : 0}px` }}>
                        <div className="card-content"  >
                            {children()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
