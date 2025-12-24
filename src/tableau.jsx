import AddItem from './components/addItems/addItems'
import { DraggableWrapper } from './components/draggable/draggableWrapper'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import Minuteur from './components/tools/minuteur/minuteur'
import Consigne from './components/tools/consigne/consigne'
import Group from './components/tools/group/group'
import { useClasse } from './hooks/useClasse'
import { useDraggableTools } from './hooks/useDraggableTools'
import { useMemo } from 'react'

function Tableau({ classePath }) {
  const { dataClasse, isLoading, error } = useClasse(classePath)
  const {
    toolsList,
    activeId,
    addTool,
    removeTool,
    focusTool,
    handleDragStart,
    handleDragEnd,
  } = useDraggableTools(classePath)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const TOOL_COMPONENTS = useMemo(
    () => ({
      minuteur: Minuteur,
      consigne: Consigne,
      group: Group,
    }),
    []
  )

  const renderTool = (tool) => {
    const ToolComponent = TOOL_COMPONENTS[tool.type]
    return ToolComponent ? <ToolComponent dataClasse={dataClasse} /> : null
  }

  return (
    <div className="h-screen w-screen bg-background">
      <DndContext
        sensors={sensors}
        modifiers={[restrictToWindowEdges]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {toolsList.map((tool) => (
          <DraggableWrapper
            key={tool.id}
            id={tool.id}
            top={tool.top}
            left={tool.left}
            zIndex={tool.zIndex || 1}
            isDragging={activeId === tool.id}
            onRemove={removeTool}
            onFocus={focusTool}
          >
            {renderTool(tool)}
          </DraggableWrapper>
        ))}
        <AddItem onAdd={addTool} />
      </DndContext>
    </div>
  )
}

export default Tableau
