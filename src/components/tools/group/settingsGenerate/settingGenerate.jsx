import Counter from "../../../ui/Counter/counter";
import { Plus, Minus } from "lucide-react";
import { RocketIcon } from "@/src/components/ui/rocket";
import AnimatedList from "../../../ui/AnimatedList/AnimatedList";

export function SettingGenerate({ eleves, Gpvalue, Elvalue, increment, decrement, handleIsChecked, handleIsGenerate }) {
  return (
    <div className="w-96 h-96 shadow-lg items-center justify-items-center cursor-pointer gap-8 flex rounded-3xl overflow-hidden  p-4 relative bg-white">
      <div className="rounded-2xl p-4 flex-grow h-full  overflow-hidden bg-gray-100">
        <AnimatedList
          items={eleves}
          showGradients={false}
          enableArrowNavigation={false}
          displayScrollbar={false}
          isChecked={handleIsChecked}
        />
      </div>
      <div className="h-full w-64 flex flex-col gap-4">
        <div className="flex flex-1 justify-center p-4 flex-col rounded-2xl gap-2 bg-gray-100 shadow-md">
          <span className="capitalize text-center text-base text-purple-600">nb. groupes</span>
          <div className="flex justify-between items-center">
            <button className="border-none h-6 w-6 rounded-2xl p-0 bg-gray-300 flex justify-center items-center cursor-pointer transition-transform duration-300 ease active:scale-95 active:text-purple-600 active:bg-purple-200" id="gp" onClick={decrement}>
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
            <button className="border-none h-6 w-6 rounded-2xl p-0 bg-gray-300 flex justify-center items-center cursor-pointer transition-transform duration-300 ease active:scale-95 active:text-purple-600 active:bg-purple-200" id="gp" onClick={increment}>
              <Plus size={15} color="#681EEA" strokeWidth={1}/>
            </button>
          </div>
          <button className="border-none py-2 px-0 bg-gray-300 text-gray-800 flex justify-center items-center cursor-pointer rounded-xl font-extralight italic transition-all duration-500 ease active:bg-purple-200 active:text-white hover:scale-105 hover:text-purple-600" onClick={() => handleIsGenerate("gp")}>
            <RocketIcon size={15} className="[&_svg]:stroke-1" />
          </button>
        </div>
        <div className="flex flex-1 justify-center p-4 flex-col rounded-2xl gap-2 bg-gray-100 shadow-md">
          <span className="capitalize text-center text-base text-purple-600">nb. élèves</span>
          <div className="flex justify-between items-center">
            <button className="border-none h-6 w-6 rounded-2xl p-0 bg-gray-300 flex justify-center items-center cursor-pointer transition-transform duration-300 ease active:scale-95 active:text-purple-600 active:bg-purple-200" id="el" onClick={decrement}>
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
            <button className="border-none h-6 w-6 rounded-2xl p-0 bg-gray-300 flex justify-center items-center cursor-pointer transition-transform duration-300 ease active:scale-95 active:text-purple-600 active:bg-purple-200" id="el" onClick={increment}>
              <Plus size={15} color="#681EEA" strokeWidth={1}/>
            </button>
          </div>
          <button className="border-none py-2 px-0 bg-gray-300 text-gray-800 flex justify-center items-center cursor-pointer rounded-xl font-extralight italic transition-all duration-500 ease active:bg-purple-200 active:text-white hover:scale-105 hover:text-purple-600" onClick={() => handleIsGenerate("el")}>
            <RocketIcon size={15} className="[&_svg]:stroke-1" />
          </button>
        </div>
      </div>
    </div>
  );
}