import React, { useState } from 'react';

const Notification = (props) => {
  const [exit, setExit] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }
        clearInterval(id);
        return prev;
      });
    }, 20);
    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: 'REMOVE_NOTIFICATION',
        id: props.id,
      });
    }, 400);
  };

  React.useEffect(() => {
    if (progressPercent === 100) {
      handleCloseNotification();
    }
  }, [progressPercent]);

  React.useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <article
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
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
      <div className="message-body">{props.message}</div>
      <progress
        className="progress notification-bar is-success  is-small is-radiusless"
        value={`${progressPercent}`}
        max="100"
      />
    </article>
  );
};
export default Notification;
