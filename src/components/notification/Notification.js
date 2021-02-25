import React, { useState } from 'react';
import PropTypes from 'prop-types';
import achievements from '../../data/achievements.json';
import { SHIRTS, PANTS, HATS } from '../../js/constants';
import levelUp from '../../data/Levelup.json';

const Notification = (props) => {
  const [exit, setExit] = useState(false);

  const handleCloseNotification = () => {
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: 'REMOVE_NOTIFICATION',
        id: props.id,
      });
    }, 400);
  };

  var svg;
  if (props.type === 'achievement_unlocked') {
    let icon = achievements.find((el) => el.id === props.achievementId);
    if (icon === undefined) {
      svg = achievements.find((el) => el.id === 'default').svg;
    } else {
      svg = icon.svg;
    }
  } else if (props.type === 'assets_unlocked') {
    props.assets
      .sort((a, b) => {
        let order = [];
        if (a.attributes.includes('on-top') || b.attributes.includes('on-top'))
          order = [SHIRTS, PANTS, HATS];
        else order = [PANTS, SHIRTS, HATS];
        return order.indexOf(a.category) - order.indexOf(b.category);
      })
      .forEach((asset) => {
        svg += '<g>' + asset.svg + '</g>';
      });
  } else if (props.type === 'level_up') {
    svg = levelUp.svg;
  }

  return (
    <article
      className={`message notification-item ${props.colorClass} ${
        exit ? 'exit' : ''
      }`}
    >
      <div className="message-header">
        <p>{props.title}</p>
        <button
          className="delete"
          onClick={handleCloseNotification}
          aria-label="delete"
        ></button>
      </div>
      <div className="message-body">
        <div className="columns">
          {props.type !== 'text' && (
            <div className="pl-2" style={{ width: '110px' }}>
              <svg
                viewBox="0 0 110 110"
                width="auto"
                height="100px"
                dangerouslySetInnerHTML={{
                  __html: svg,
                }}
              />
            </div>
          )}
          <div className="column">
            {props.name !== undefined && (
              <p className="subtitle mb-2">{props.name}</p>
            )}
            <p>{props.message}</p>
          </div>
        </div>
      </div>
    </article>
  );
};
export default Notification;

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  name: PropTypes.string,
  achievementId: PropTypes.number,
  assets: PropTypes.array,
  colorClass: PropTypes.string,
};
