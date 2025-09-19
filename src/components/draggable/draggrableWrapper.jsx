import { useDraggable } from "@dnd-kit/core";
import Magnet from "../../ui/Magnet/Magnet";
import "./draggableWrapper.css";

export function DraggableWrapper({ id, top, left, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const inlineTransform = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="draggableWrapper"
      style={{ top, left, transform: inlineTransform }}
      {...listeners}
      {...attributes}
    >
      <Magnet
        disabled={!!transform}
        freeze={!!transform}
        magnetStrength={8}
        padding={50}
      >
        {children}
      </Magnet>
    </div>
  );
}
