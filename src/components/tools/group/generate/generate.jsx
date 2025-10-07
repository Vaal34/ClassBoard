import { useState, useEffect } from 'react'
import {
  grouperAleatoireParNEleves,
  grouperAleatoireParNGroupes,
} from '@/scripts/randomiser'
import { RotateCcw } from 'lucide-react'

export function Generate({
  eleves,
  Elvalue,
  Gpvalue,
  method,
  handleIsGenerate,
}) {
  const [groupeList, setGroupeList] = useState([])

  useEffect(() => {
    if (!eleves || eleves.length === 0) {
      setGroupeList([])
      return
    }

    if (method === 'gp') {
      setGroupeList(grouperAleatoireParNGroupes(eleves, Gpvalue))
    } else if (method === 'el') {
      setGroupeList(grouperAleatoireParNEleves(eleves, Elvalue))
    }
  }, [method])

  // Calculer le nombre de colonnes en fonction du nombre de groupes
  const getGridColumns = () => {
    const groupCount = groupeList.length
    if (groupCount === 0) return '1fr'
    if (groupCount === 1) return '1fr'
    if (groupCount === 2) return 'repeat(2, 1fr)'
    if (groupCount <= 4) return 'repeat(2, 1fr)'
    if (groupCount <= 6) return 'repeat(3, 1fr)'
    if (groupCount <= 9) return 'repeat(3, 1fr)'
    if (groupCount > 10) return 'repeat(4, 1fr)'
    return 'repeat(auto-fit, minmax(250px, 1fr))'
  }

  return (
    <div className="relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-3xl bg-white p-4 shadow-lg">
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: getGridColumns() }}
      >
        {groupeList.map((groupe, index) => (
          <div
            key={index}
            className="flex h-full w-full gap-4 rounded-2xl bg-gray-100 p-4"
          >
            <ul className="m-0 flex w-full list-none flex-col gap-2 p-0">
              {groupe.map((eleve) => (
                <li
                  key={eleve.id}
                  className="ease rounded-xl bg-white p-2 shadow-md transition-colors duration-200"
                >
                  <span className="block max-w-full overflow-hidden font-medium text-ellipsis whitespace-nowrap">
                    {eleve.prenom} {eleve.nom}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        className="ease mb-1 flex cursor-pointer items-center justify-center rounded-2xl border-none bg-purple-50 p-4 font-extralight text-purple-600 italic transition-all duration-500 hover:bg-gray-300 hover:text-gray-800 active:bg-purple-200 active:text-white hover:[&_svg]:animate-spin"
        onClick={handleIsGenerate}
      >
        <RotateCcw size={15} strokeWidth={1} />
      </button>
    </div>
  )
}

export default Generate
