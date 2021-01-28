import achievements from './achievements.json';
import PropTypes from 'prop-types';
import { useLayer } from 'react-laag';
import React from 'react';

export default function Achievement(props) {
  const [isOpen, setOpen] = React.useState(false);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    placement: 'bottom-center',
    triggerOffset: 0,
  });

  var achievement = achievements.find((el) => el.id === props.id);
  var svg;
  if (achievement === undefined) {
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
          width="auto"
          height="100px"
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
              width: '100',
              height: '100',
              backgroundColor: '#7F7F7FDF',
              color: '#FFF',
            }}
          >
            <span
              style={{
                maxWidth: 100,
              }}
            >
              <svg
                viewBox="0 0 110 110"
                width={100}
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
};
