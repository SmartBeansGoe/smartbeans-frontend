import {
  mdiCheckboxBlankCircleOutline,
  mdiCheckboxMarkedCircleOutline,
} from '@mdi/js';
import React, { Component } from 'react';
import { BLUE } from '../../js/constants';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';

export default class ExerciseListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthListItem: 0,
      widthSpanSkills: 0,
    };

    this.ListItemRef = React.createRef();
    this.SpanSkillsRef = React.createRef();

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    // The height must be updated if the window size changes, therefore the Event Listener.
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      widthListItem: this.ListItemRef.current.offsetWidth,
      widthSpanSkills: this.SpanSkillsRef.current.offsetWidth,
    });
  }

  renderSkillTags(exercise) {
    let categories = exercise.categories;
    return categories.map((el, id) => {
      return (
        <span
          key={el + id}
          style={{
            marginLeft: 4,
            backgroundColor: BLUE,
            color: 'whitesmoke',
          }}
          className="tag"
        >
          {el}
        </span>
      );
    });
  }

  render() {
    return (
      <li className="flex-container" ref={this.ListItemRef}>
        <span
          style={{
            left: '-2em',
            position: 'absolute',
            textAlign: 'center',
            width: '2em',
            lineHeight: ' inherit',
          }}
        >
          {this.props.exercise.solved ? (
            <Icon
              path={mdiCheckboxMarkedCircleOutline}
              size={1.0}
              style={{ color: BLUE }}
            />
          ) : (
            <Icon path={mdiCheckboxBlankCircleOutline} size={1.0} />
          )}
        </span>
        <Link
          className={
            this.props.exercise.solved ? 'has-text-smart' : 'has-text-grey'
          }
          to={{
            pathname: '/exercises/' + this.props.exercise.taskid,
            state: { task: this.props.exercise },
          }}
          style={{
            marginLeft: 10,
            display: 'inline-block',
            width: this.props.width - 200 - this.state.widthSpanSkills,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {this.props.exercise.name}
        </Link>
        <span style={{ flexGrow: 1.0 }}></span>
        <span ref={this.SpanSkillsRef}>
          {this.renderSkillTags(this.props.exercise)}
        </span>
      </li>
    );
  }
}

ExerciseListItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
};
