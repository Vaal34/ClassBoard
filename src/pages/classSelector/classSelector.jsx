import { Link } from 'react-router-dom'
import { FileCogIcon } from '@/components/ui/file-cog'
import { ArrowRightIcon } from '@/components/ui/arrow-right'
import { useClasses } from '@/hooks/useClasses'

function ClassSelector() {
  const { listClasses, isLoading, error } = useClasses()

  return (
    <div className="flex h-dvh w-dvw flex-col gap-4 p-4">
      <div className="flex justify-between">
        <span className="text-left text-4xl font-light">CLASSBOARD.</span>
        <Link
          className="linear flex cursor-pointer items-center justify-center rounded-2xl border-0 bg-transparent p-3 text-inherit no-underline transition-all duration-300 hover:bg-purple-50 hover:text-purple-600"
          to={`/setting-class`}
        >
          <FileCogIcon className="[&_svg]:stroke-1" />
        </Link>
      </div>
      <div className="grid h-full grid-cols-4 gap-8">
        {Object.values(listClasses).map((classe) => (
          <div
            className="flex flex-col items-center gap-2 rounded-3xl bg-gray-100 p-2 no-underline shadow-lg transition-all duration-300 ease-in-out hover:bg-purple-50 hover:shadow-lg hover:shadow-purple-200"
            key={classe.id}
          >
            <div className="relative flex w-full flex-grow items-end justify-center overflow-hidden rounded-3xl bg-linear-to-r from-cyan-500 to-blue-500 bg-cover bg-center px-0 py-4 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-3xl before:bg-[url('./background-selector.webp')] before:[mask-image:linear-gradient(to_top,rgba(0,0,0,1)_10%,rgba(0,0,0,0)_30%)] before:bg-cover before:bg-center before:blur-sm before:content-[''] before:[-webkit-mask-image:linear-gradient(to_top,rgba(0,0,0,1)_10%,rgba(0,0,0,0)_30%)]">
              <div className="relative z-10 flex w-4/5 flex-col">
                <span className="text-xs text-gray-300 italic">classes</span>
                <span className="text-xl font-bold text-white italic">
                  {classe.name}
                </span>
              </div>
            </div>
            <Link
              className="ease flex h-8 w-4/5 cursor-pointer items-center justify-center rounded-full border-none bg-gray-300 font-extralight text-gray-800 italic transition-all duration-300 hover:scale-105 hover:bg-purple-100 hover:text-purple-600 active:bg-purple-200"
              key={classe.id}
              to={`/classe/${classe.path}`}
            >
              <ArrowRightIcon size={15} className="[&_svg]:stroke-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClassSelector
