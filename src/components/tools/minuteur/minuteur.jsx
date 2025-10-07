import { ChevronUp, ChevronDown, Play, RotateCcw, Square } from 'lucide-react'
import { useTimer } from 'react-timer-hook'
import { useState } from 'react'
import catDay from '@/assets/images/catDay.png'
import catNight from '@/assets/images/catNight.jpg'

function Minuteur() {
  const [expire, setExpire] = useState(false)
  const [editTime, setEditTime] = useState(false)
  const [customHours, setCustomHours] = useState(0)
  const [customMinutes, setCustomMinutes] = useState(0)
  const [customSeconds, setCustomSeconds] = useState(10)

  const getExpiryTime = () => {
    const now = new Date()
    const totalSeconds = customHours * 3600 + customMinutes * 60 + customSeconds
    now.setSeconds(now.getSeconds() + totalSeconds)
    return now
  }

  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp: getExpiryTime(),
      autoStart: false,
      onExpire: () => setExpire(true),
    })

  const handleRestart = () => {
    restart(getExpiryTime(), false)
    setExpire(false)
    setEditTime(false)
  }

  const textTimesDict = [
    { value: editTime ? customHours : hours, label: 'hours', type: 'hours' },
    {
      value: editTime ? customMinutes : minutes,
      label: 'min',
      type: 'minutes',
    },
    {
      value: editTime ? customSeconds : seconds,
      label: 'sec',
      type: 'seconds',
    },
  ]

  const handleEditTime = () => {
    if (!isRunning) {
      setExpire(false)
      setEditTime(!editTime)
    }
  }

  const adjustTime = (type, direction) => {
    if (direction === 'up') {
      switch (type) {
        case 'hours':
          setCustomHours((prev) => Math.min(prev + 1, 23))
          break
        case 'minutes':
          setCustomMinutes((prev) => Math.min(prev + 1, 59))
          break
        case 'seconds':
          setCustomSeconds((prev) => Math.min(prev + 1, 59))
          break
      }
    } else {
      switch (type) {
        case 'hours':
          setCustomHours((prev) => Math.max(prev - 1, 0))
          break
        case 'minutes':
          setCustomMinutes((prev) => Math.max(prev - 1, 0))
          break
        case 'seconds':
          setCustomSeconds((prev) => Math.max(prev - 1, 0))
          break
      }
    }
  }

  const handleStart = () => {
    if (editTime) {
      restart(getExpiryTime(), true)
      setEditTime(false)
    } else {
      resume()
    }
  }

  return (
    <div
      className={`relative flex h-96 w-80 cursor-pointer items-end overflow-hidden rounded-3xl shadow-lg ${isRunning ? 'running' : ''}`}
    >
      <img
        className={`absolute top-0 left-0 z-0 h-full w-full object-cover object-bottom ${isRunning ? 'clip-path-[circle(100%_at_center)]' : 'clip-path-[circle(100%_at_center)]'}`}
        src={catDay}
        alt="Day"
      />
      <img
        className={`absolute top-0 left-0 h-full w-full object-cover object-bottom transition-[clip-path] duration-500 ease-in-out ${isRunning ? 'clip-path-[circle(0%_at_center)] z-0' : 'clip-path-[circle(100%_at_center)] z-[1]'}`}
        src={catNight}
        alt="Night"
      />
      <div className="relative z-10 flex h-4/5 w-full flex-col items-center gap-5">
        <div
          onClick={handleEditTime}
          className={`flex w-4/5 justify-between gap-3 ${isRunning ? 'text-gray-900' : 'text-yellow-100'}`}
        >
          {textTimesDict.map((textTime, index) => (
            <div
              key={textTime.label}
              className="flex w-full flex-col items-center justify-between text-5xl transition-colors duration-500 ease-in-out select-none"
            >
              {editTime && !isRunning && (
                <ChevronUp
                  onClick={(e) => {
                    e.stopPropagation()
                    adjustTime(textTime.type, 'up')
                  }}
                  style={{ width: '100%', backdropFilter: 'blur(1px)' }}
                />
              )}
              <span className="text-right font-semibold tabular-nums">
                {textTime.value.toString().padStart(2, '0')}
              </span>
              <span className="mt-[-10px] text-center text-base font-extralight">
                {textTime.label}
              </span>
              {editTime && !isRunning && (
                <ChevronDown
                  onClick={(e) => {
                    e.stopPropagation()
                    adjustTime(textTime.type, 'down')
                  }}
                  style={{ width: '100%', backdropFilter: 'blur(1px)' }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          {expire ? (
            <button
              type="button"
              onClick={handleRestart}
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none bg-gray-900 p-4 shadow-lg transition-all duration-200 ease-in-out hover:scale-105"
            >
              <RotateCcw size={16} color="#fff" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleStart}
                className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none p-4 shadow-lg transition-all duration-200 ease-in-out hover:scale-105 ${
                  isRunning ? 'bg-yellow-100' : 'bg-gray-900'
                }`}
              >
                <Play
                  size={16}
                  color={isRunning ? '#07040B' : '#fffcdd'}
                  fill={isRunning ? '#07040B' : '#fffcdd'}
                />
              </button>

              <button
                onDoubleClick={handleRestart}
                type="button"
                onClick={pause}
                className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none p-4 shadow-lg transition-all duration-200 ease-in-out hover:scale-105 ${
                  isRunning ? 'bg-gray-900' : 'bg-yellow-100'
                }`}
              >
                <Square
                  size={16}
                  color={isRunning ? '#fffcdd' : '#07040B'}
                  fill={isRunning ? '#fffcdd' : '#07040B'}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Minuteur
