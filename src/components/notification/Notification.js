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

  return (
    <article
      className={`message notification-item is-success ${exit ? 'exit' : ''}`}
    >
      <div className="message-header">
        <p>{props.title}</p>
        <button
          className="delete"
          onClick={handleCloseNotification}
          aria-label="delete"
        ></button>
      </div>
      <div className="message-body p-0" >
        {props.isAchievment &&
          <div className="flex-container">
            <span>
              <svg
                viewBox="0 0 110 110"
                width="auto"
                height="100px"
                dangerouslySetInnerHTML={{
                  __html: achievements.find((el) => el.id === props.achievementId)['svg'],
                }}
              />

            </span>
            <span>
              <p className="subtitle margin-top">{props.achievementName}</p>
              <p>{props.message}</p>
            </span>

          </div>}
        {!props.isAchievment &&
          <div className="container p-3">
            <p>
              {props.message}
            </p>
          </div>
        }
      </div>
    </article>
  );
};
export default Notification;
