import PropTypes from 'prop-types';
import Achievement from './Achievement';
import './AchievementList.css';

export default function AchievementList(props) {
  return (
    <div className="achievement-list-container">
      {props.achievements
        .filter((achievement) =>
          props.completed
            ? achievement.completed !== null
            : achievement.completed === null
        )
        .sort((a, b) =>
          props.completed
            ? a.completed > b.completed
            : a.frequency < b.frequency
        )
        .map((achievement) => {
          return (
            <div
              key={achievement.id}
              style={{
                width: '100px',
                height: 'auto',
              }}
            >
              <Achievement
                id={achievement.id}
                name={achievement.name}
                description={achievement.description}
              />
            </div>
          );
        })}
    </div>
  );
}

AchievementList.propTypes = {
  achievements: PropTypes.array.isRequired,
  completed: PropTypes.bool.isRequired,
};
