import PropTypes from 'prop-types';
import Achievement from './Achievement';

export default function AchievementList(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        overflow: 'scroll',
      }}
    >
      {props.achievements
        .filter((achievement) => achievement.completed == props.completed)
        .map((achievement) => {
          return (
            <div
              key={achievement}
              style={{
                width: '100px',
                height: 'auto',
              }}
            >
              <Achievement
                id={achievement.id}
                completed={achievement.completed}
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
