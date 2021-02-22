import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Submission from './Submission';
import lang from '../../lang/de_DE.json';

export default class SubmissionOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentsHeight: 0,
    };
    this.handler = this.handler.bind(this);
  }

  handler = (previousHeight, currentHeight) => {
    this.setState({
      componentsHeight:
        this.state.componentsHeight - previousHeight + currentHeight,
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.submissions.length !== 0 && (
          <div className="is-child tile">
            <Submission
              key={this.props.submissions[0].timestamp}
              id={this.props.submissions.length}
              result={this.props.submissions[0]}
              handler={() => {}}
              defaultOpen={true}
            />
            {this.props.submissions.length > 1 && (
              <Card
                title={lang['submission.previous-attempts']}
                hasSymbol={false}
                componentHeight={this.state.componentsHeight}
                handler={this.handler}
                defaultOpen={false}
              >
                {() =>
                  this.props.submissions
                    .slice(1)
                    .map((result, index) => (
                      <Submission
                        key={result.timestamp}
                        id={this.props.submissions.length - index - 1}
                        result={result}
                        handler={this.handler}
                        defaultOpen={false}
                      />
                    ))
                }
              </Card>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

SubmissionOverview.propTypes = {
  submissions: PropTypes.array.isRequired,
};
