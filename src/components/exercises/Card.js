import React, { Component } from 'react';
import { mdiChevronDown, mdiChevronUp, mdiCheckBold, mdiCancel } from '@mdi/js';
import { Icon } from '@mdi/react';
import './Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.submissionRef = React.createRef();
    this.cardRef = React.createRef();
    this.state = {
      isOpen: this.props.defaultOpen,
      isActive: '',
      contentHeight: 0,
    };
  }

  componentDidMount() {
    this.props.handler(0, this.props.defaultOpen ? 20000 : this.cardRef.current.scrollHeight);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      isActive: !this.state.isOpen ? 'active' : '',
      contentHeight: !this.state.isOpen
        ? this.submissionRef.current.scrollHeight
        : 0,
    });
    this.props.handler(
      this.state.contentHeight,
      !this.state.isOpen ? this.submissionRef.current.scrollHeight : 0
    );
  };

  render() {
    const { children } = this.props;
    return (
      <div className="card" ref={this.cardRef}>
        <header
          className={`card-header ${this.state.isActive}`}
          onClick={this.toggle}
        >
          {this.props.hasSymbol && (
            <span
              className={`icon ml-2 has-text-${this.props.isSuccess ? 'success' : 'danger'
                }`}
            >
              <Icon path={this.props.isSuccess ? mdiCheckBold : mdiCancel} />
            </span>
          )}
          <p className="card-header-title">{this.props.title}</p>
          <div className="card-header-icon">
            <span className="icon">
              <Icon path={this.state.isOpen ? mdiChevronUp : mdiChevronDown} />
            </span>
          </div>
        </header>
        <div
          className="toCollapse"
          ref={this.submissionRef}
          style={{
            maxHeight: `${this.state.isOpen ? this.props.componentHeight : 0
              }px`,
          }}
        >
          <div className="card-content">{children()}</div>
        </div>
      </div>
    );
  }
}
