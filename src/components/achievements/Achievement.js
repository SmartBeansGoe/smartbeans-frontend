import achievements from './achievements.json';
import PropTypes from 'prop-types';
import './Achievement.css';

export default function Achievement(props) {
  var achievement = achievements.find((el) => el.id === props.id);
  var svg;
  if (achievement === undefined) {
    svg = achievements.find((el) => el.id === "default").svg
  }
  else {
    svg = achievement.svg;
  }
  return (
    <div className="regular tooltip">
      <svg
        viewBox="0 0 110 110"
        width="auto"
        height="100px"
        dangerouslySetInnerHTML={{
          __html: svg,
        }}
      />
      <div className="tooltiptext">
        <div className="flex-container">
          <span>
            <svg
              viewBox="0 0 110 110"
              width="auto"
              height="100px"
              dangerouslySetInnerHTML={{
                __html: svg,
              }}
            />
          </span>
          <span>
            <p className="title margin-top">{props.name}</p>
            <p>{props.description}</p>
          </span>
        </div>
      </div>
    </div>
  );
}

Achievement.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
