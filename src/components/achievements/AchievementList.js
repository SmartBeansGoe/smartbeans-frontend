import PropTypes from 'prop-types';
import Achievement from './Achievement';

export default function AchievementList(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        overflow: 'scroll',
        minWidth: '350px', // hotfix
        maxWidth: '650px', // hotfix
      }}
    >
      {props.achievements
        .filter((achievement) =>
          props.completed
            ? achievement.completed !== null
            : achievement.completed === null
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
