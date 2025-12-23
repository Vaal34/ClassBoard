import { useState, useEffect } from 'react'
import {
  grouperAleatoireParNEleves,
  grouperAleatoireParNGroupes,
} from '@/scripts/randomiser'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RotateCcw } from '@/components/animate-ui/icons/rotate-ccw'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'

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

  console.log('Generate component method:', method)

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
  console.log('Generate component eleves:', groupeList)

  return (
    <Card className="corner-squircle relative flex cursor-pointer flex-col gap-4 overflow-hidden p-4">
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: getGridColumns() }}
      >
        {groupeList.map((groupe, index) => (
          <ul
            key={index}
            className="corner-superellipse/1.5 flex h-full w-full flex-col gap-2 rounded-2xl p-4 shadow-sm"
          >
            {groupe.map((eleve) => (
              <li
                key={eleve.id}
                className="corner-superellipse/1.5 w-full rounded-2xl bg-neutral-100 p-2 pr-6 pl-4 font-medium text-ellipsis whitespace-nowrap text-black"
              >
                <span className="font-bold">{eleve.prenom}</span>{' '}
                <span className="font-light">{eleve.nom}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <AnimateIcon animateOnHover="rotate">
        <Button
          className="corner-squircle bg-accent text-primary active:bg-accent w-full transition-colors duration-500 hover:bg-gray-200 hover:text-black"
          onClick={() => handleIsGenerate(method)}
        >
          <RotateCcw strokeWidth={1.5} />
        </Button>
      </AnimateIcon>
    </Card>
  )
}

export default Generate
