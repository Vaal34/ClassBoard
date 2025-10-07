import Counter from '@/components/ui/Counter/counter'
import { Plus, Minus } from 'lucide-react'
import { RocketIcon } from '@/components/ui/rocket'
import AnimatedList from '@/components/ui/AnimatedList/AnimatedList'

export function SettingGenerate({
  eleves,
  Gpvalue,
  Elvalue,
  increment,
  decrement,
  handleIsChecked,
  handleIsGenerate,
}) {
  return (
    <div className="relative flex h-96 w-96 cursor-pointer items-center justify-items-center gap-8 overflow-hidden rounded-3xl bg-white p-4 shadow-lg">
      <div className="h-full flex-grow overflow-hidden rounded-2xl bg-gray-100 p-4">
        <AnimatedList
          items={eleves}
          showGradients={false}
          enableArrowNavigation={false}
          displayScrollbar={false}
          isChecked={handleIsChecked}
        />
      </div>
      <div className="flex h-full w-64 flex-col gap-4">
        <div className="flex flex-1 flex-col justify-center gap-2 rounded-2xl bg-gray-100 p-4 shadow-md">
          <span className="text-center text-base text-purple-600 capitalize">
            nb. groupes
          </span>
          <div className="flex items-center justify-between">
            <button
              className="ease flex h-6 w-6 cursor-pointer items-center justify-center rounded-2xl border-none bg-gray-300 p-0 transition-transform duration-300 active:scale-95 active:bg-purple-200 active:text-purple-600"
              id="gp"
              onClick={decrement}
            >
              <Minus size={15} color="#681EEA" strokeWidth={1} />
            </button>
            <Counter
              value={Gpvalue}
              gradientHeight={0}
              places={[10, 1]}
              fontSize={60}
              padding={0}
              gap={0}
              textColor="#000"
            />
            <button
              className="ease flex h-6 w-6 cursor-pointer items-center justify-center rounded-2xl border-none bg-gray-300 p-0 transition-transform duration-300 active:scale-95 active:bg-purple-200 active:text-purple-600"
              id="gp"
              onClick={increment}
            >
              <Plus size={15} color="#681EEA" strokeWidth={1} />
            </button>
          </div>
          <button
            className="ease flex cursor-pointer items-center justify-center rounded-xl border-none bg-gray-300 px-0 py-2 font-extralight text-gray-800 italic transition-all duration-500 hover:scale-105 hover:text-purple-600 active:bg-purple-200 active:text-white"
            onClick={() => handleIsGenerate('gp')}
          >
            <RocketIcon size={15} className="[&_svg]:stroke-1" />
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 rounded-2xl bg-gray-100 p-4 shadow-md">
          <span className="text-center text-base text-purple-600 capitalize">
            nb. élèves
          </span>
          <div className="flex items-center justify-between">
            <button
              className="ease flex h-6 w-6 cursor-pointer items-center justify-center rounded-2xl border-none bg-gray-300 p-0 transition-transform duration-300 active:scale-95 active:bg-purple-200 active:text-purple-600"
              id="el"
              onClick={decrement}
            >
              <Minus size={15} color="#681EEA" strokeWidth={1} />
            </button>
            <Counter
              value={Elvalue}
              gradientHeight={0}
              places={[10, 1]}
              fontSize={60}
              padding={0}
              gap={0}
              textColor="#000"
            />
            <button
              className="ease flex h-6 w-6 cursor-pointer items-center justify-center rounded-2xl border-none bg-gray-300 p-0 transition-transform duration-300 active:scale-95 active:bg-purple-200 active:text-purple-600"
              id="el"
              onClick={increment}
            >
              <Plus size={15} color="#681EEA" strokeWidth={1} />
            </button>
          </div>
          <button
            className="ease flex cursor-pointer items-center justify-center rounded-xl border-none bg-gray-300 px-0 py-2 font-extralight text-gray-800 italic transition-all duration-500 hover:scale-105 hover:text-purple-600 active:bg-purple-200 active:text-white"
            onClick={() => handleIsGenerate('el')}
          >
            <RocketIcon size={15} className="[&_svg]:stroke-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
