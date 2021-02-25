import achievements from '../../data/achievements.json';
import PropTypes from 'prop-types';
import { useLayer } from 'react-laag';
import React from 'react';
import lang from '../../lang/de_DE.json';

export default function Achievement(props) {
  const [isOpen, setOpen] = React.useState(false);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    placement: 'bottom-center',
    triggerOffset: 0,
  });

  var achievement = achievements.find((el) => el.id === props.id);
  var svg;
  if (
    achievement === undefined ||
    achievement.svg === undefined ||
    achievement.svg === '' ||
    achievement.svg === null
  ) {
    svg = achievements.find((el) => el.id === 'default').svg;
  } else {
    svg = achievement.svg;
  }
  return (
    <>
      <div
        {...triggerProps}
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <svg
          viewBox="0 0 110 110"
          dangerouslySetInnerHTML={{
            __html: svg,
          }}
        />
      </div>
      {isOpen &&
        renderLayer(
          <div
            className="flex-container box"
            {...layerProps}
            style={{
              ...layerProps.style,
              backgroundColor: '#7F7F7FDF',
              color: '#FFF',
            }}
          >
            <span style={{ width: 200 }}>
              <svg
                viewBox="0 0 110 110"
                dangerouslySetInnerHTML={{
                  __html: svg,
                }}
              />
            </span>
            <span>
              <p
                className="title margin-top"
                style={{
                  color: '#FFF',
                }}
              >
                {props.name}
              </p>
              <p>{props.description}</p>

              <p className=" has-text-right  has-text-weight-light  is-italic mt-4">
                {lang['dashboard.archievement.frequency']}
                {parseInt(props.frequency)}{' '}
                {lang['dashboard.archievement.percent']}
              </p>
            </span>
          </div>
        )}
    </>
  );
}

Achievement.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  frequency: PropTypes.number.isRequired,
};
