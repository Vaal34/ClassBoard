import { Link } from "react-router-dom";
import { FileCogIcon } from "@/src/components/ui/file-cog";
import { ArrowRightIcon } from "@/src/components/ui/arrow-right";
import { useClasses } from "../../hooks/useClasses";

function ClassSelector() {
  const { listClasses, isLoading, error } = useClasses();

  return (
    <div className="flex flex-col p-4 gap-4 h-dvh w-dvw">
      <div className="flex justify-between">
        <span className="text-4xl text-left font-light">CLASSBOARD.</span>
        <Link
          className="flex items-center justify-center cursor-pointer border-0 rounded-2xl p-3 transition-all duration-300 linear bg-transparent no-underline text-inherit hover:text-purple-600 hover:bg-purple-50"
          to={`/setting-class`}
        >
          <FileCogIcon className="[&_svg]:stroke-1" />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-8 h-full ">
        {Object.values(listClasses).map((classe) => (
          <div
            className="flex flex-col items-center bg-gray-100 rounded-3xl p-2 no-underline transition-all duration-300 ease-in-out shadow-lg gap-2 hover:shadow-purple-200 hover:shadow-lg hover:bg-purple-50"
            key={classe.id}
          >
            <div className="w-full flex-grow rounded-3xl bg-linear-to-r from-cyan-500 to-blue-500 bg-cover bg-center flex items-end justify-center py-4 px-0 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[url('./background-selector.webp')] before:bg-cover before:bg-center before:blur-sm before:[mask-image:linear-gradient(to_top,rgba(0,0,0,1)_10%,rgba(0,0,0,0)_30%)] before:[-webkit-mask-image:linear-gradient(to_top,rgba(0,0,0,1)_10%,rgba(0,0,0,0)_30%)] before:pointer-events-none before:rounded-3xl before:z-0">
              <div className="flex flex-col w-4/5 relative z-10">
                <span className="italic text-gray-300 text-xs">classes</span>
                <span className="text-white text-xl italic font-bold">
                  {classe.name}
                </span>
              </div>
            </div>
            <Link
              className="w-4/5 h-8 rounded-full border-none bg-gray-300 text-gray-800 flex justify-center items-center cursor-pointer font-extralight italic transition-all duration-300 ease hover:scale-105 hover:text-purple-600 hover:bg-purple-100 active:bg-purple-200"
              key={classe.id}
              to={`/classe/${classe.path}`}
            >
              <ArrowRightIcon size={15} className="[&_svg]:stroke-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassSelector;
