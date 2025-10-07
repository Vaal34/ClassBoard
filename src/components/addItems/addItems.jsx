import { TimerIcon } from '@/components/ui/timer'
import { HomeIcon } from '@/components/ui/home'
import { FilePenLineIcon } from '@/components/ui/file-pen-line'
import { UsersIcon } from '@/components/ui/users'
import { useNavigate } from 'react-router-dom'

const tools = [
  {
    icon: <TimerIcon className="[&_svg]:stroke-1" />,
    label: 'Minuteur',
    type: 'minuteur',
  },
  {
    icon: <FilePenLineIcon className="[&_svg]:stroke-1" />,
    label: 'Consigne',
    type: 'consigne',
  },
  {
    icon: <UsersIcon className="[&_svg]:stroke-1" />,
    label: 'Groupe',
    type: 'group',
  },
]

function AddItem({ onAdd }) {
  let navigate = useNavigate()

  return (
    <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 transform cursor-pointer gap-4 rounded-lg p-3">
      <button
        className="linear flex cursor-pointer items-center justify-center rounded-2xl border-0 p-3 transition-all duration-300 hover:scale-110 hover:bg-purple-50 hover:text-purple-600"
        onClick={() => navigate(-1)}
      >
        <HomeIcon className="[&_svg]:stroke-1" />
      </button>
      {tools.map((tool) => (
        <button
          key={tool.label}
          className="linear flex cursor-pointer items-center justify-center rounded-2xl border-0 p-3 transition-all duration-300 hover:scale-110 hover:bg-purple-50 hover:text-purple-600"
          onClick={() => onAdd(tool.type)}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  )
}

export default AddItem
