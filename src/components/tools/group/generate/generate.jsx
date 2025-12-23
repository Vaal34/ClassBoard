import { useState, useEffect } from 'react'
import {
  grouperAleatoireParNEleves,
  grouperAleatoireParNGroupes,
} from '@/scripts/randomiser'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

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
    <Card className="relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-3xl p-4">
      <CardContent className="p-0 space-y-4">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: getGridColumns() }}
        >
          {groupeList.map((groupe, index) => (
            <Card key={index} className="flex h-full w-full gap-4 rounded-2xl shadow-sm">
              <CardContent className="p-4 w-full">
                <ul className="m-0 flex w-full list-none flex-col gap-2 p-0">
                  {groupe.map((eleve) => (
                    <li key={eleve.id}>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "ease rounded-xl p-2 shadow-sm w-full justify-start",
                          "transition-colors duration-200",
                          "font-medium text-ellipsis overflow-hidden whitespace-nowrap block"
                        )}
                      >
                        {eleve.prenom} {eleve.nom}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "mb-1 rounded-2xl p-4",
            "bg-accent/50 hover:bg-muted",
            "font-extralight text-primary italic",
            "hover:text-foreground",
            "active:bg-accent active:text-white",
            "transition-all duration-500",
            "hover:[&_svg]:animate-spin"
          )}
          onClick={handleIsGenerate}
        >
          <RotateCcw size={15} strokeWidth={1} />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Generate
