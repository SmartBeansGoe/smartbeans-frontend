import {
  mdiCheckboxBlankCircleOutline,
  mdiCheckboxMarkedCircleOutline,
} from '@mdi/js';
import React, { Component } from 'react';
import { BLUE } from '../../../js/constants';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import SkillTag from './SkillTag';

export default class ExerciseListItem extends Component {
  constructor(props) {
    super(props);
    if (this.props.hasTags) {
      this.state = {
        widthWindow: window.innerWidth,
        widthSpanSkills: 0,
      };

      this.SpanSkillsRef = React.createRef();

      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
  }

  componentDidMount() {
    if (this.props.hasTags) {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      this.setState({
        widthSpanSkills: this.SpanSkillsRef.current.offsetWidth,
      });
    }
  }

  componentWillUnmount() {
    if (this.props.hasTags) {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
  }

  updateWindowDimensions() {
    this.setState({
      widthWindow: window.innerWidth,
    });
  }

  renderSkillTags(exercise) {
    let categories = exercise.categories;
    return categories.map((el, id) => {
      return <SkillTag skill={el} key={el + id} />;
    });
  }

  render() {
    return (
      <li
        style={
          this.props.hasTags
            ? {
                height: 24,
              }
            : {}
        }
      >
        <span
          style={{
            left: '-1.5em',
            position: 'absolute',
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
          style={
            this.props.hasTags
              ? {
                  marginLeft: 10,
                  width:
                    this.state.widthWindow <= 768
                      ? 'calc(70vw - ' + this.state.widthSpanSkills + 'px)'
                      : 'calc(32vw - ' + this.state.widthSpanSkills + 'px)',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }
              : { marginLeft: 10 }
          }
        >
          {this.props.exercise.name}
        </Link>
        {this.props.hasTags ? (
          <span
            ref={this.SpanSkillsRef}
            style={{
              whiteSpace: 'nowrap',
              textAlign: 'right',
              position: 'absolute',
              right: 0,
            }}
          >
            {this.renderSkillTags(this.props.exercise)}
          </span>
        ) : null}
      </li>
    );
  }
}

ExerciseListItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  hasTags: PropTypes.bool.isRequired,
};
