import { ChevronUp, ChevronDown, Play, RotateCcw, Square } from "lucide-react";
import { useTimer } from "react-timer-hook";
import { useState } from "react";
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
    <div className={`w-80 h-96 shadow-lg cursor-pointer flex items-end relative overflow-hidden rounded-3xl ${isRunning ? "running" : ""}`}>
      <img className={`absolute top-0 left-0 w-full h-full object-cover object-bottom z-0 ${isRunning ? "clip-path-[circle(100%_at_center)]" : "clip-path-[circle(100%_at_center)]"}`} src={catDay} alt="Day" />
      <img className={`absolute top-0 left-0 w-full h-full object-cover object-bottom transition-[clip-path] duration-500 ease-in-out ${isRunning ? "z-0 clip-path-[circle(0%_at_center)]" : "z-[1] clip-path-[circle(100%_at_center)]"}`} src={catNight} alt="Night" />
      <div className="relative z-10 w-full h-4/5 flex gap-5 items-center flex-col">
        <div
          onClick={handleEditTime}
          className={`gap-3 flex justify-between w-4/5 ${isRunning ? "text-gray-900" : "text-yellow-100"}`}
        >
          {textTimesDict.map((textTime, index) => (
            <div key={textTime.label} className="text-5xl w-full flex flex-col justify-between items-center transition-colors duration-500 ease-in-out select-none">
              {editTime && !isRunning && (
                <ChevronUp
                  onClick={(e) => {
                    e.stopPropagation();
                    adjustTime(textTime.type, "up");
                  }}
                  style={{ width: "100%", backdropFilter: "blur(1px)" }}
                />
              )}
              <span className="font-semibold text-right tabular-nums">
                {textTime.value.toString().padStart(2, "0")}
              </span>
              <span className="mt-[-10px] text-base font-extralight text-center">{textTime.label}</span>
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
        <div className="flex justify-center items-center gap-3">
          {expire ? (
            <button
              type="button"
              onClick={handleRestart}
              className="w-14 h-14 flex justify-center items-center p-4 rounded-full border-none cursor-pointer transition-all duration-200 ease-in-out shadow-lg bg-gray-900 hover:scale-105"
            >
              <RotateCcw size={16} color="#fff" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleStart}
                className={`w-14 h-14 flex justify-center items-center p-4 rounded-full border-none cursor-pointer transition-all duration-200 ease-in-out shadow-lg hover:scale-105 ${
                  isRunning ? "bg-yellow-100" : "bg-gray-900"
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
                className={`w-14 h-14 flex justify-center items-center p-4 rounded-full border-none cursor-pointer transition-all duration-200 ease-in-out shadow-lg hover:scale-105 ${
                  isRunning ? "bg-gray-900" : "bg-yellow-100"
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
