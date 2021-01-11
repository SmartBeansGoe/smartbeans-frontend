import React, { Component } from "react";
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { Icon } from '@mdi/react';
import "./Card.css";

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.submissionRef = React.createRef();
    }
    state = {
        isOpen: false,
        isActive: "",
        contentHeight: "0px",
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            isActive: !this.state.isOpen ? "active" : "",
            contentHeight: !this.state.isOpen ? `${this.submissionRef.current.scrollHeight}px` : "0px"
        })
    }
    getHeight = () =>{
        console.log(this.state.isOpen)
        return this.state.isOpen ? `${this.submissionRef.current.scrollHeight}px` : "0px";
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <div className="card">
                    <header className={`card-header ${this.state.isActive}`} onClick={this.toggle}>
                        <p className="card-header-title">{this.props.title}</p>
                        <div className="card-header-icon"  >
                            <span className="icon">
                                <Icon path={this.state.isOpen ? mdiChevronUp : mdiChevronDown} />
                            </span>
                        </div>
                    </header>
                    <div className="toCollapse" ref={this.submissionRef} style={{ maxHeight: `${this.getHeight()}` }}>
                        <div className="card-content"  >
                            {children()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
