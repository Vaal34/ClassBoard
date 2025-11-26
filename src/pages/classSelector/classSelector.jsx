import { useClasses } from '@/hooks/useClasses'
import { Search } from 'lucide-react'
import { useState } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import ClassCard from '@/components/classSelector/classCard'
import { Button } from '@/components/ui/button'
import { Cog } from '@/components/animate-ui/icons/cog'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Link } from 'react-router-dom'

function ClassSelector() {
  const { listClasses } = useClasses()
  const [searchText, setSearchText] = useState('')

  const filteredClasses = listClasses.filter((classe) =>
    classe.name?.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="flex h-screen flex-col gap-4 p-5">
      {/* En-tête avec recherche */}
      <div className="flex w-full items-start justify-between gap-4">
        <div>
          <h1 className="text-foreground font-clash text-4xl font-bold uppercase">
            Sélectionnez une classe
          </h1>
          <p className="text-muted-foreground">
            Choisissez la classe vers laquelle vous souhaitez naviguer
          </p>
        </div>

        <div className="flex gap-2">
          {/* Barre de recherche */}
          <InputGroup className="w-80">
            <InputGroupInput
              placeholder="Rechercher une classe..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              {filteredClasses.length} résultats
            </InputGroupAddon>
          </InputGroup>
          <Link to="/setting-class">
            <AnimateIcon
              animateOnHover
              animation="default"
              className="flex flex-col items-center"
            >
              <Button>
                <Cog className="text-purple-200" />
              </Button>
            </AnimateIcon>
          </Link>
        </div>
      </div>

      {/* Grille des classes */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredClasses.map((classe) => (
            <ClassCard key={classe.id} classe={classe} />
          ))}
        </div>

        {/* Message si aucune classe trouvée */}
        {filteredClasses.length === 0 && listClasses.length > 0 && (
          <div className="py-12 text-center">
            <div className="text-muted-foreground mb-4 text-6xl">🔍</div>
            <p className="text-foreground mb-2 text-xl">
              Aucune classe trouvée
            </p>
            <p className="text-muted-foreground">
              Essayez de modifier votre recherche
            </p>
          </div>
        )}

        {/* Message si aucune classe disponible */}
        {listClasses.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-muted-foreground mb-4 text-6xl">📚</div>
            <p className="text-foreground mb-2 text-xl">
              Aucune classe disponible
            </p>
            <p className="text-muted-foreground">
              Contactez votre administrateur pour ajouter des classes
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassSelector
