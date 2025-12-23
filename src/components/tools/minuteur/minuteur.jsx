import { ChevronUp, ChevronDown, Play, RotateCcw, Square, SquareArrowLeft, Pause } from 'lucide-react'
import { useTimer } from 'react-timer-hook'
import { useState } from 'react'
import catDay from '@/assets/images/catDay.png'
import catNight from '@/assets/images/catNight.jpg'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

  const handleReset = () => {
    setCustomHours(0)
    setCustomMinutes(0)
    setCustomSeconds(0)
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

  const handleWheel = (e, type) => {
    if (editTime && !isRunning) {
      e.preventDefault()
      e.stopPropagation()
      const direction = e.deltaY > 0 ? 'down' : 'up'
      adjustTime(type, direction)
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
    <Card
      className={`corner-squircle p-6 relative flex cursor-pointer overflow-hidden shadow-lg ${isRunning ? 'running' : ''}`}
    >

      <div
        onClick={handleEditTime}
        className={`flex w-4/5 justify-between gap-3`}
      >
        {textTimesDict.map((textTime, index) => (
          <div
            key={textTime.label}
            onWheel={(e) => handleWheel(e, textTime.type)}
            className="flex w-full flex-col items-center justify-between text-5xl transition-colors duration-500 ease-in-out select-none"
          >
            {editTime && !isRunning && (
              <ChevronUp
                onClick={(e) => {
                  e.stopPropagation()
                  adjustTime(textTime.type, 'up')
                }}
                color='var(--primary)'
              />
            )}
            <span className={`font-semibold tabular-nums ${(textTime.type === 'hours' && hours > 0) ||
              (textTime.type === 'minutes' && (hours > 0 || minutes > 0)) ||
              (textTime.type === 'seconds' && (hours > 0 || minutes > 0 || seconds > 0))
              ? 'text-primary'
              : 'text-muted-foreground'
              }`}>
              {textTime.value.toString().padStart(2, '0')}
            </span>
            <span className="mt-[-8px] text-base font-extralight">
              {textTime.label}
            </span>
            {editTime && !isRunning && (
              <ChevronDown
                onClick={(e) => {
                  e.stopPropagation()
                  adjustTime(textTime.type, 'down')
                }}
                color='var(--primary)'
              />
            )}
          </div>
        ))}
      </div>
      <div className="corner-superellipse/1.5 rounded-2xl flex w-full h-20 bg-card p-2 items-center justify-center gap-3">
        {expire ? (
          <Button
            type="button"
            onClick={handleRestart}
            variant="default"
            className="h-full w-1/2 corner-squircle cursor-pointer"
          >
            <RotateCcw size={16} color="#fff" />
          </Button>
        ) : (
          <>
            <Button
              type="button"
              onDoubleClick={handleRestart}
              onClick={handleStart}
              variant={isRunning ? "default" : "white"}
              className="corner-squircle h-full flex-1 cursor-pointer"
            >
              <Play
                fill={isRunning ? "#fff" : "var(--primary)"}
                color={isRunning ? "#fff" : "var(--primary)"}
              />
            </Button>

            <Button
              onDoubleClick={handleReset}
              onClick={pause}
              variant={isRunning ? "white" : "default"}
              className="corner-squircle h-full flex-1 cursor-pointer"
            >
              <Pause
                fill={isRunning ? "var(--primary)" : "#fff"}
                color={isRunning ? "var(--primary)" : "#fff"}
                size={16}
              />
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}

export default Minuteur
