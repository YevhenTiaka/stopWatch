import React, { useState } from 'react';
import { Observable } from 'rxjs';

const Stopwatch = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [id, setId] = useState();
  const [isStarted, setIsStarted] = useState(false);

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

  const timer = () => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    setId(intervalId);
  };

  const handleToggle = () => {
    if (!isStarted) {
      setIsStarted(true);
      timer();
    } else {
      setIsStarted(false);
      Observable(clearInterval(id));
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  };

  const handleReset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    if (seconds > 0) {
      Observable(clearInterval(id));
      timer();
    }
  };

  const handleWait = () => {
    Observable(clearInterval(id));
    setIsStarted(false);
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
