import AddItem from "./components/addItems/addItems";
import { DraggableWrapper } from "./components/draggable/draggrableWrapper";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useState } from "react";
import Minuteur from "./components/tools/minuteur/minuteur";
import Consigne from "./components/tools/consigne/consigne";
import Group from "./components/tools/group/group";
import { v4 as uuidv4 } from "uuid";
import { useClasse } from "./hooks/useClasse";


function Tableau({classePath}) {
  const [toolsList, setToolsList] = useState([]);
  const { dataClasse, isLoading, error } = useClasse(classePath);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const TOOLS = {
    MINUTEUR: "minuteur",
    CONSIGNE: "consigne",
    GROUP: "group",
  };
  const TOOL_COMPONENTS = {
    [TOOLS.MINUTEUR]: Minuteur,
    [TOOLS.CONSIGNE]: Consigne,
    [TOOLS.GROUP]: Group,
  };
  
  const handleDragEnd = (event) => {
    setToolsList((toolsList) =>
      toolsList.map((tool) => {
        if (tool.id === event.active.id) {
          return {
            ...tool,
            top: tool.top + event.delta.y,
            left: tool.left + event.delta.x,
          };
        }
        return tool;
      })
    );
  };

  const onAdd = (type) => {
    const newItems = { id: uuidv4(), top: 200, left: 200, type: type };
    setToolsList((toolsList) => [...toolsList, newItems]);
  };

  const renderTool = (tool) => {
    const ToolComponent = TOOL_COMPONENTS[tool.type];
    return ToolComponent ? <ToolComponent dataClasse={dataClasse} /> : null;
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToWindowEdges]}
      onDragEnd={handleDragEnd}
      className="w-screen h-screen"
    >
      {toolsList.map((tool) => (
        <DraggableWrapper
          key={tool.id}
          id={tool.id}
          top={tool.top}
          left={tool.left}
        >
          {renderTool(tool)}
        </DraggableWrapper>
      ))}
      <AddItem onAdd={onAdd} />
    </DndContext>
  );
}

export default Tableau;
