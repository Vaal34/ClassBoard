import { useDraggable } from '@dnd-kit/core'
import Magnet from '@/components/ui/Magnet/Magnet'

export function DraggableWrapper({ id, top, left, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  })

  const inlineTransform = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined

  return (
    <div
      ref={setNodeRef}
      className="absolute cursor-move touch-none select-none"
      style={{ top, left, transform: inlineTransform }}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
}
