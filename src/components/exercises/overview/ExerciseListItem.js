import {
  mdiCheckboxBlankCircleOutline,
  mdiCheckboxMarkedCircleOutline,
} from '@mdi/js';
import React, { Component } from 'react';
import { BLUE } from '../../../js/constants';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';

export default class ExerciseListItem extends Component {
  render() {
    return (
      <li>
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
          }}
        >
          {this.props.exercise.name}
        </Link>
      </li>
    );
  }
}

ExerciseListItem.propTypes = {
  exercise: PropTypes.object.isRequired,
};
