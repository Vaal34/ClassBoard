import {
  ChevronUp,
  ChevronDown,
  Play,
  RotateCcw,
  Pause,
  Volume2,
  VolumeX,
  Clock,
} from 'lucide-react'
import { useTimer } from 'react-timer-hook'
import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function Minuteur() {
  const [expire, setExpire] = useState(false)
  const [editTime, setEditTime] = useState(false)
  const [customHours, setCustomHours] = useState(0)
  const [customMinutes, setCustomMinutes] = useState(0)
  const [customSeconds, setCustomSeconds] = useState(10)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showPresets, setShowPresets] = useState(false)
  const audioContextRef = useRef(null)

  const getExpiryTime = () => {
    const now = new Date()
    const totalSeconds = customHours * 3600 + customMinutes * 60 + customSeconds
    now.setSeconds(now.getSeconds() + totalSeconds)
    return now
  }

  // Play notification sound using Web Audio API
  const playNotificationSound = () => {
    if (!soundEnabled) return

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)()
      }

      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Pleasant bell-like sound
      oscillator.frequency.setValueAtTime(800, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        ctx.currentTime + 0.5
      )

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.5)
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp: getExpiryTime(),
      autoStart: false,
      onExpire: () => {
        setExpire(true)
        playNotificationSound()
      },
    })

  // Preset times in seconds
  const presets = [
    { label: '1 min', seconds: 60 },
    { label: '5 min', seconds: 300 },
    { label: '10 min', seconds: 600 },
    { label: '15 min', seconds: 900 },
    { label: '30 min', seconds: 1800 },
  ]

  const setPresetTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60

    setCustomHours(h)
    setCustomMinutes(m)
    setCustomSeconds(s)
    setShowPresets(false)
    setEditTime(false)

    const now = new Date()
    now.setSeconds(now.getSeconds() + totalSeconds)
    restart(now, false)
    setExpire(false)
  }

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
      className={`corner-squircle relative flex flex-col w-80 overflow-hidden p-6 shadow-lg gap-4 ${isRunning ? 'running' : ''} ${expire ? 'animate-pulse' : ''}`}
    >
      {/* Expiration overlay */}
      {expire && (
        <div className="absolute inset-0 bg-primary/95 flex flex-col items-center justify-center z-10 gap-4">
          <p className="text-4xl font-bold text-white">Temps écoulé !</p>
          <Button
            onClick={handleRestart}
            variant="secondary"
            className="corner-squircle"
          >
            <RotateCcw size={16} className="mr-2" />
            Recommencer
          </Button>
        </div>
      )}

      {/* Header with preset and sound buttons */}
      {!isRunning && (
        <div className="flex items-center justify-between gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setShowPresets(!showPresets)
            }}
            variant="outline"
            size="sm"
            className="corner-squircle h-8"
          >
            <Clock size={14} className="mr-1" />
            Presets
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation()
              setSoundEnabled(!soundEnabled)
            }}
            variant="ghost"
            size="sm"
            className="corner-squircle h-8 w-8 p-0"
          >
            {soundEnabled ? (
              <Volume2 size={16} color="var(--primary)" />
            ) : (
              <VolumeX size={16} color="var(--muted-foreground)" />
            )}
          </Button>
        </div>
      )}

      {/* Preset buttons */}
      {showPresets && !isRunning && (
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.label}
              onClick={() => setPresetTime(preset.seconds)}
              variant="outline"
              size="sm"
              className="corner-squircle flex-1"
            >
              {preset.label}
            </Button>
          ))}
        </div>
      )}

      <div
        onClick={handleEditTime}
        className={`flex justify-between gap-3 ${editTime ? 'ring-2 ring-primary/50 rounded-lg p-2 -m-2' : 'cursor-pointer'}`}
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
                color="var(--primary)"
              />
            )}
            <span
              className={`font-semibold tabular-nums ${
                (textTime.type === 'hours' && hours > 0) ||
                (textTime.type === 'minutes' && (hours > 0 || minutes > 0)) ||
                (textTime.type === 'seconds' &&
                  (hours > 0 || minutes > 0 || seconds > 0))
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {textTime.value.toString().padStart(2, '0')}
            </span>
            <span className="-mt-2 text-base font-extralight">
              {textTime.label}
            </span>
            {editTime && !isRunning && (
              <ChevronDown
                onClick={(e) => {
                  e.stopPropagation()
                  adjustTime(textTime.type, 'down')
                }}
                color="var(--primary)"
              />
            )}
          </div>
        ))}
      </div>
      <div className="corner-superellipse/1.5 bg-card flex h-20 w-full items-center justify-center gap-3 rounded-2xl p-2">
        <Button
          type="button"
          onDoubleClick={handleRestart}
          onClick={handleStart}
          variant={isRunning ? 'default' : 'white'}
          className="corner-squircle h-full flex-1 cursor-pointer"
        >
          <Play
            fill={isRunning ? 'currentColor' : 'var(--primary)'}
            color={isRunning ? 'currentColor' : 'var(--primary)'}
            className={isRunning ? 'text-white' : ''}
          />
        </Button>

        <Button
          onDoubleClick={handleReset}
          onClick={pause}
          variant={isRunning ? 'white' : 'default'}
          className="corner-squircle h-full flex-1 cursor-pointer"
        >
          <Pause
            fill={isRunning ? 'var(--primary)' : 'currentColor'}
            color={isRunning ? 'var(--primary)' : 'currentColor'}
            className={isRunning ? '' : 'text-white'}
            size={16}
          />
        </Button>
      </div>

      {/* Hint text */}
      {!isRunning && !editTime && !showPresets && (
        <p className="text-xs text-muted-foreground/40 text-center -mt-2">
          Cliquez sur les chiffres pour éditer • Double-clic pour reset
        </p>
      )}
    </Card>
  )
}

export default Minuteur
