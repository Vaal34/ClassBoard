import Counter from '@/components/ui/Counter/counter'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'

export function SettingGenerate({
  eleves,
  Gpvalue,
  Elvalue,
  setGpValue,
  setElvalue,
  handleIsChecked,
  handleIsGenerate,
}) {
  return (
    <Card className="corner-squircle relative grid h-96 w-full cursor-pointer grid-cols-2 grid-rows-2 p-6">
      {/* Liste des élèves - une seule cellule pour toute la hauteur */}
      <div className="col-start-1 row-span-2 row-start-1 flex flex-col">
        <ScrollArea
          hideScrollbar={true}
          className="corner-superellipse/1.5 h-full rounded-2xl"
        >
          <div className="flex flex-col gap-2">
            {(eleves || []).map((eleve) => {
              const itemId = eleve.uniqueId || eleve.id
              return (
                <div
                  key={itemId}
                  className="corner-superellipse/1.1 flex cursor-pointer items-center gap-5 rounded-2xl bg-neutral-100 p-2 pr-10 pl-3"
                >
                  <Checkbox
                    id={`cbx-${itemId}`}
                    checked={eleve.checked}
                    onCheckedChange={() => handleIsChecked(itemId)}
                    className="corner-superellipse/1.5 cursor-pointer rounded-2xl"
                  />
                  <p
                    htmlFor={`cbx-${itemId}`}
                    className={`flex-1 cursor-pointer capitalize ${!eleve.checked && 'text-muted-foreground'}`}
                  >
                    <span className="font-bold">{eleve.prenom}</span>{' '}
                    <span className="text-xs font-light uppercase italic">
                      {eleve.nom}
                    </span>
                  </p>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Nombre de groupes - ligne 1, colonne 2 */}
      <div className="corner-superellipse/1.5 col-start-2 row-start-1 flex flex-col items-center justify-between rounded-3xl bg-neutral-100 p-4">
        <span className="text-primary text-sm font-light">Groupes</span>
        <Counter
          className={'w-full justify-between bg-transparent'}
          number={Gpvalue}
          setNumber={setGpValue}
          slidingNumberProps={{ className: 'text-5xl font-bold' }}
          buttonProps={{ className: 'shadow-sm' }}
        />
        <Button
          onClick={() => handleIsGenerate('gp')}
          className="corner-superellipse/1.5 flex w-full rounded-4xl text-white"
        >
          Générer
        </Button>
      </div>

      {/* Élèves par groupe - ligne 2, colonne 2 */}
      <div className="corner-superellipse/1.5 col-start-2 row-start-2 flex flex-col items-center justify-between rounded-3xl bg-neutral-100 p-4">
        <span className="text-primary text-sm font-light">Élèves</span>
        <Counter
          className={'w-full justify-between bg-transparent'}
          number={Elvalue}
          setNumber={setElvalue}
          slidingNumberProps={{ className: 'text-5xl font-bold' }}
          buttonProps={{ className: 'shadow-sm' }}
        />
        <Button
          onClick={() => handleIsGenerate('el')}
          className="corner-superellipse/1.5 flex w-full rounded-4xl text-white"
        >
          Générer
        </Button>
      </div>
    </Card>
  )
}
