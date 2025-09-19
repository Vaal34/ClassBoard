import { ChevronUp, ChevronDown, Play, RotateCcw, Square } from "lucide-react";
import { useTimer } from "react-timer-hook";
import { useState } from "react";
import "./minuteur.css";
import catDay from "../minuteur/catDay.png";
import catNight from "../minuteur/catNight.jpg";

function Minuteur() {
  const [expire, setExpire] = useState(false);
  const [editTime, setEditTime] = useState(false);
  const [customHours, setCustomHours] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(0);
  const [customSeconds, setCustomSeconds] = useState(10);

  const getExpiryTime = () => {
    const now = new Date();
    const totalSeconds =
      customHours * 3600 + customMinutes * 60 + customSeconds;
    now.setSeconds(now.getSeconds() + totalSeconds);
    return now;
  };

  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp: getExpiryTime(),
      autoStart: false,
      onExpire: () => setExpire(true),
    });

  const handleRestart = () => {
    restart(getExpiryTime(), false);
    setExpire(false);
    setEditTime(false);
  };

  const textTimesDict = [
    { value: editTime ? customHours : hours, label: "hours", type: "hours" },
    {
      value: editTime ? customMinutes : minutes,
      label: "min",
      type: "minutes",
    },
    {
      value: editTime ? customSeconds : seconds,
      label: "sec",
      type: "seconds",
    },
  ];

  const handleEditTime = () => {
    if (!isRunning) {
      setExpire(false);
      setEditTime(!editTime);
    }
  };

  const adjustTime = (type, direction) => {
    if (direction === "up") {
      switch (type) {
        case "hours":
          setCustomHours((prev) => Math.min(prev + 1, 23));
          break;
        case "minutes":
          setCustomMinutes((prev) => Math.min(prev + 1, 59));
          break;
        case "seconds":
          setCustomSeconds((prev) => Math.min(prev + 1, 59));
          break;
      }
    } else {
      switch (type) {
        case "hours":
          setCustomHours((prev) => Math.max(prev - 1, 0));
          break;
        case "minutes":
          setCustomMinutes((prev) => Math.max(prev - 1, 0));
          break;
        case "seconds":
          setCustomSeconds((prev) => Math.max(prev - 1, 0));
          break;
      }
    }
  };

  const handleStart = () => {
    if (editTime) {
      restart(getExpiryTime(), true);
      setEditTime(false);
    } else {
      resume();
    }
  };

  return (
    <div className={`minuteur ${isRunning ? "running" : ""}`}>
      <img className="background day-image" src={catDay} alt="Day" />
      <img className="background night-image" src={catNight} alt="Night" />
      <div className="content-minuteur">
        <div
          onClick={handleEditTime}
          className={`time-block ${isRunning ? "span-night" : "span-day"}`}
        >
          {textTimesDict.map((textTime, index) => (
            <div key={textTime.label} className="time-text">
              {editTime && !isRunning && (
                <ChevronUp
                  onClick={(e) => {
                    e.stopPropagation();
                    adjustTime(textTime.type, "up");
                  }}
                  style={{ width: "100%", backdropFilter: "blur(1px)" }}
                />
              )}
              <span className="span-time">
                {textTime.value.toString().padStart(2, "0")}
              </span>
              <span className="span-label">{textTime.label}</span>
              {editTime && !isRunning && (
                <ChevronDown
                  onClick={(e) => {
                    e.stopPropagation();
                    adjustTime(textTime.type, "down");
                  }}
                  style={{ width: "100%", backdropFilter: "blur(1px)" }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="button-box">
          {expire ? (
            <button
              type="button"
              onClick={handleRestart}
              className={`button-action button-action-active`}
            >
              <RotateCcw size={16} color="#fff" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleStart}
                className={`button-action ${
                  isRunning ? "button-action-inactive" : "button-action-active"
                }`}
              >
                <Play
                  size={16}
                  color={isRunning ? "#07040B" : "#fffcdd"}
                  fill={isRunning ? "#07040B" : "#fffcdd"}
                />
              </button>

              <button
                onDoubleClick={handleRestart}
                type="button"
                onClick={pause}
                className={`button-action ${
                  isRunning ? "button-action-active" : "button-action-inactive"
                }`}
              >
                <Square
                  size={16}
                  color={isRunning ? "#fffcdd" : "#07040B"}
                  fill={isRunning ? "#fffcdd" : "#07040B"}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Minuteur;
