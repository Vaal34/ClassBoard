import { TimerIcon } from "../ui/timer";
import { HomeIcon } from "../ui/home";
import { FilePenLineIcon } from "../ui/file-pen-line";
import { UsersIcon } from "../ui/users";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    icon: <TimerIcon className="[&_svg]:stroke-1" />,
    label: "Minuteur",
    type: "minuteur",
  },
  {
    icon: <FilePenLineIcon className="[&_svg]:stroke-1" />,
    label: "Consigne",
    type: "consigne",
  },
  {
    icon: <UsersIcon className="[&_svg]:stroke-1" />,
    label: "Groupe",
    type: "group",
  },
];

function AddItem({ onAdd }) {
  let navigate = useNavigate();

  return (
    <div className="absolute left-1/2 bottom-5 transform -translate-x-1/2 cursor-pointer p-3 rounded-lg flex gap-4">
      <button className="flex items-center justify-center cursor-pointer border-0 rounded-2xl p-3 transition-all duration-300 linear hover:scale-110 hover:text-purple-600 hover:bg-purple-50" onClick={() => navigate(-1)}>
        <HomeIcon className="[&_svg]:stroke-1" />
      </button>
      {tools.map((tool) => (
        <button
          key={tool.label}
          className="flex items-center justify-center cursor-pointer border-0 rounded-2xl p-3 transition-all duration-300 linear hover:scale-110 hover:text-purple-600 hover:bg-purple-50"
          onClick={() => onAdd(tool.type)}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
}

export default AddItem;
