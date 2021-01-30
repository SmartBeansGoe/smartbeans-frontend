import React, { useState } from 'react';
import achievements from './../achievements/achievements.json';

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
  var achievement = achievements.find((el) => el.id === props.id);
  var svg;
  if (achievement === undefined) {
    svg = achievements.find((el) => el.id === 'default').svg;
  } else {
    svg = achievement.svg;
  }

  return (
    <article
      className={`message notification-item ${props.type} ${
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
      <div className="message-body p-0">
        <div className="flex-container">
          {props.pictureId !== -1 && (
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
          )}
          <span>
            {props.name !== null && (
              <p className="subtitle margin-top">{props.name}</p>
            )}
            <p>{props.message}</p>
          </span>
        </div>
      </div>
    </article>
  );
};
export default Notification;
