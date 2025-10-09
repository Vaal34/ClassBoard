import { Tabs, TabsList, TabsTrigger } from '@/components/ui/motion-tabs'
import { Users } from '../animate-ui/icons/users'
import { AnimateIcon } from '../animate-ui/icons/icon'
import { User } from '../animate-ui/icons/user'

const tabs = [
  {
    icon: <User className="text-primary stroke-1" />,
    name: 'ELEVES',
    value: 'byEleves',
    content: 'Affiche de la liste des élèves',
  },
  {
    icon: <Users className="text-primary stroke-1" />,
    name: 'CLASSES',
    value: 'byClass',
    content: 'Affiche de la liste des élèves par classe',
  },
]

function SwapData({ handleSwapData, activeSwap }) {
  return (
    <Tabs
      value={activeSwap}
      onValueChange={handleSwapData}
      className="h-full w-1/4"
    >
      <TabsList className="h-full w-full p-3">
        {tabs.map((tab) => (
          <AnimateIcon
            key={tab.value}
            animate={activeSwap === tab.value}
            animation="default"
            className="h-full w-full"
          >
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex flex-col text-2xl font-bold"
            >
              {tab.icon}
              {tab.name}
            </TabsTrigger>
          </AnimateIcon>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default SwapData
