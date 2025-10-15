import { useClasses } from '@/hooks/useClasses'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
import ClassCard from '@/components/classSelector/classCard'

function ClassSelector() {
  const { listClasses } = useClasses()
  const [searchText, setSearchText] = useState('')

  const filteredClasses = listClasses.filter((classe) =>
    classe.name?.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="flex h-screen flex-col gap-4 p-5">
      {/* En-tête avec recherche */}
      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground font-clash uppercase">
            Sélectionnez une classe
          </h1>
          <p className="text-muted-foreground">
            Choisissez la classe vers laquelle vous souhaitez naviguer
          </p>
        </div>
        
        {/* Barre de recherche */}
        <div className="relative w-80">
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <Search className="size-4" />
          </div>
          <Input
            className="peer pl-9"
            type="text"
            placeholder="Rechercher une classe..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Grille des classes */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredClasses.map((classe) => (
            <ClassCard key={classe.id} classe={classe} />
          ))}
        </div>

        {/* Message si aucune classe trouvée */}
        {filteredClasses.length === 0 && listClasses.length > 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-6xl mb-4">🔍</div>
            <p className="text-foreground text-xl mb-2">Aucune classe trouvée</p>
            <p className="text-muted-foreground">Essayez de modifier votre recherche</p>
          </div>
        )}

        {/* Message si aucune classe disponible */}
        {listClasses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-6xl mb-4">📚</div>
            <p className="text-foreground text-xl mb-2">Aucune classe disponible</p>
            <p className="text-muted-foreground">Contactez votre administrateur pour ajouter des classes</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassSelector
