import Counter from '@/components/ui/Counter/counter'
import { RocketIcon } from '@/components/ui/rocket'
import AnimatedList from '@/components/ui/AnimatedList/AnimatedList'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
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
    <Card className="corner-squircle relative grid h-96 w-full grid-cols-2 grid-rows-[2fr_2fr_1fr] gap-4 p-6">
      {/* Liste des élèves - une seule cellule pour toute la hauteur */}
      <div className="row-span-full">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-2">
            <Label className="mb-2 text-sm font-medium">Élèves</Label>
            <AnimatedList showGradients={false} enableArrowNavigation={false}>
              {eleves?.map((eleve) => (
                <div key={eleve.id} className="flex items-center gap-2 py-1">
                  <Checkbox
                    id={`eleve-${eleve.id}`}
                    checked={eleve.isChecked}
                    onCheckedChange={() => handleIsChecked(eleve.id)}
                  />
                  <Label
                    htmlFor={`eleve-${eleve.id}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {eleve.nom} {eleve.prenom}
                  </Label>
                </div>
              ))}
            </AnimatedList>
          </div>
        </ScrollArea>
      </div>

      {/* Nombre de groupes - ligne 1, colonne 2 */}
      <div className="corner-superellipse/1.5 col-start-2 row-start-1 flex flex-col items-center justify-center gap-2 rounded-3xl bg-gray-100">
        <Label className="text-primary text-sm font-light">
          Nombre de groupes
        </Label>
        <Counter
          className={'w-full justify-around bg-transparent'}
          number={Gpvalue}
          setNumber={setGpValue}
          slidingNumberProps={{ className: 'text-5xl font-bold' }}
        />
      </div>

      {/* Élèves par groupe - ligne 2, colonne 2 */}
      <div className="corner-superellipse/1.5 col-start-2 row-start-2 flex flex-col items-center justify-center gap-2 rounded-3xl bg-gray-100">
        <Label className="text-primary text-sm font-light">
          Élèves par groupe
        </Label>
        <Counter
          className={'w-full justify-around bg-transparent'}
          number={Elvalue}
          setNumber={setElvalue}
          slidingNumberProps={{ className: 'text-5xl font-bold' }}
        />
      </div>

      {/* Bouton de génération - ligne 3, colonne 2 */}
      <div className="col-start-2 row-start-3 flex items-end">
        <Button
          onClick={handleIsGenerate}
          className="h-full w-full bg-purple-600 text-white hover:bg-purple-700"
          size="lg"
        >
          <RocketIcon className="mr-2 h-5 w-5" />
          Générer les groupes
        </Button>
      </div>
    </Card>
  )
}
