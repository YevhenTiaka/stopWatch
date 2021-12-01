import React, { useState } from 'react';

const Stopwatch = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isStartedId, setIsStartedId] = useState(false);

  const sec = seconds < 10 ? `0${seconds}` : seconds;
  const min = minutes < 10 ? `0${minutes}` : minutes;
  const hrs = hours < 10 ? `0${hours}` : hours;

  if (seconds > 59) {
    setSeconds(0);
    setMinutes(prev => prev + 1);
  }
  if (minutes > 59) {
    setMinutes(0);
    setHours(prev => prev + 1);
  }

  const resetFunc = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const timer = () => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    setIsStartedId(intervalId);
  };

  const handleToggle = () => {
    if (!isStartedId) {
      setIsStartedId(true);
      timer();
    } else {
      setIsStartedId(false);
      clearInterval(isStartedId);
      resetFunc();
    }
  };

  const handleReset = () => {
    resetFunc();
    if (seconds > 0) {
      clearInterval(isStartedId);
      timer();
    }
  };

  const handleWait = () => {
    clearInterval(isStartedId);
    setIsStartedId(false);
  };

  return (
    <div className="container">
      <span className="container-hours">
        {hrs}:{min}:{sec}
      </span>

      <div className="items">
        <button className="items-btn btn_start" onClick={handleToggle}>
          Start / Stop
        </button>
        <button className="items-btn btn_wait" onDoubleClick={handleWait}>
          Wait
        </button>
        <button className="items-btn btn_reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
export default Stopwatch;
