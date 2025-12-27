import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Save } from 'lucide-react'

/**
 * Vue d'affichage de la consigne en grand pour la classe
 */
export function VueAffichage({ content, onBack, onSaveToHistory }) {
  const handleSave = () => {
    onSaveToHistory()
  }

  return (
    <Card className="corner-squircle flex h-full w-full flex-col gap-2 p-8 shadow-lg">
      {/* Header avec actions */}
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground/40 text-sm">
          Cliquez sur <Edit size={14} className="inline" /> pour modifier la
          consigne
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            variant="outline"
            size="icon"
            className="corner-squircle"
          >
            <Save size={16} />
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            className="corner-squircle"
          >
            <Edit size={16} />
          </Button>
        </div>
      </div>

      {/* Contenu de la consigne */}
      <div className="flex flex-1 items-center justify-center">
        <div
          className="prose prose-lg prose-headings:text-primary prose-p:text-foreground prose-strong:text-primary prose-em:text-primary/80 w-full max-w-none text-center"
          dangerouslySetInnerHTML={{
            __html:
              content ||
              '<p class="text-muted-foreground">Aucune consigne...</p>',
          }}
        />
      </div>

      {/* Footer hint */}
    </Card>
  )
}
