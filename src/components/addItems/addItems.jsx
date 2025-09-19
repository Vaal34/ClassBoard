import { CornerUpLeft, Paperclip, Timer, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./addItems.css";

const tools = [
  {
    icon: <Timer />,
    label: "Minuteur",
    type: "minuteur",
  },
  {
    icon: <Paperclip />,
    label: "Consigne",
    type: "consigne",
  },
  {
    icon: <Users />,
    label: "Groupe",
    type: "group",
  },
];

function AddItem({ onAdd }) {
  let navigate = useNavigate();

  return (
    <div className="open-button">
      <button className="add-button" onClick={() => navigate(-1)}>
        <CornerUpLeft />
      </button>
      {tools.map((tool) => (
        <button
          key={tool.label}
          className="add-button"
          onClick={() => onAdd(tool.type)}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
}

export default AddItem;
