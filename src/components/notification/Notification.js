import React, { useState } from 'react';
import PropTypes from 'prop-types';
import achievements from './../achievements/achievements.json';
import assets from '../character/sources/assets.json';

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
    console.log('this.props.assetsIds', props.assetsIds);
    props.assetsIds.forEach((asset) => {
      svg += '<g>';
      svg += assets[asset.category][asset.asset_id];
      svg += '</g>';
    });
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
            <div className="pl-2">
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
  assetsIds: PropTypes.array,
  colorClass: PropTypes.string,
};
