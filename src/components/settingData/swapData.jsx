import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/motion-tabs'
import { Users } from '../animate-ui/icons/users'
import { AnimateIcon } from '../animate-ui/icons/icon'
import { User } from '../animate-ui/icons/user'

const tabs = [
  {
    icon: <User className="text-chart-1/50 stroke-1" />,
    name: 'ELEVES',
    value: 'byEleves',
    content: 'Affiche de la liste des élèves',
  },
  {
    icon: <Users className="text-chart-1/50 stroke-1" />,
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
      className="w-full h-full"
    >
      <TabsList className="h-full w-full p-3">
        {tabs.map((tab) => (
          <AnimateIcon
            key={tab.value}
            animate={activeSwap === tab.value}
            animation="default"
            className="h-full w-full"
          >
            <TabsTrigger key={tab.value} value={tab.value} >
              <TabsContent
                value={tab.value}
                className="font-clash flex w-full flex-col items-center justify-center text-xl font-extrabold text-purple-950 uppercase italic"
              >
                {tab.icon}
                {tab.name}
              </TabsContent>
            </TabsTrigger>
          </AnimateIcon>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default SwapData
