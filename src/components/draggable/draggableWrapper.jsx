import { useDraggable } from '@dnd-kit/core'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export function DraggableWrapper({
  id,
  top,
  left,
  children,
  onRemove,
  onFocus,
  zIndex = 1,
  isDragging = false,
}) {
  const [isModifierPressed, setIsModifierPressed] = useState(false)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  })

  const inlineTransform = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined

  // Détecter la touche Ctrl ou Alt
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.altKey) {
        setIsModifierPressed(true)
      }
    }

    const handleKeyUp = (e) => {
      if (!e.ctrlKey && !e.altKey) {
        setIsModifierPressed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div
      ref={setNodeRef}
      className="group absolute select-none"
      style={{
        top,
        left,
        transform: inlineTransform,
        zIndex: isDragging ? 9999 : zIndex,
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
      }}
      onClick={() => onFocus?.(id)}
    >
      {/* Bouton de suppression */}
      {onRemove && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute -right-3 -top-3 z-10 h-7 w-7 rounded-full opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(id)
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {/* Zone de drag quand Ctrl/Alt est pressé */}
      {isModifierPressed && (
        <div
          className="absolute inset-0 z-50 cursor-move"
          {...listeners}
          {...attributes}
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {/* Contenu de l'outil */}
      <div className={isModifierPressed ? 'pointer-events-none' : 'pointer-events-auto'}>
        {children}
      </div>
    </div>
  )
}
