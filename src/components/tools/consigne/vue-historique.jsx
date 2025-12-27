import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Trash2, Eye } from 'lucide-react'

/**
 * Vue de l'historique des consignes sauvegardées
 */
export function VueHistorique({ history, onBack, onLoadFromHistory, onDeleteFromHistory }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getPreview = (html) => {
    // Extraire le texte brut du HTML pour l'aperçu
    const temp = document.createElement('div')
    temp.innerHTML = html
    const text = temp.textContent || temp.innerText || ''
    return text.substring(0, 25) + (text.length > 25 ? '...' : '')
  }

  return (
    <Card className="corner-squircle p-6 w-full flex flex-col gap-4 shadow-lg">
      <div className="flex items-center gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          size="icon"
          className="corner-squircle"
        >
          <ArrowLeft size={16} />
        </Button>
        <h2 className="text-xl font-semibold text-primary">
          Historique des consignes
        </h2>
      </div>

      <div className="h-[400px] w-full border corner-squircle rounded-xl overflow-hidden">
        <ScrollArea className="h-full w-full  ">
          {history.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                Aucune consigne dans l'historique
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-2">
            {history.map((item) => (
              <Card
                key={item.id}
                className="corner-squircle p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      {formatDate(item.timestamp)}
                    </p>
                    <p className="text-sm truncate">
                      {getPreview(item.content)}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      onClick={() => onLoadFromHistory(item.content)}
                      variant="outline"
                      size="icon"
                      className="corner-squircle h-8 w-8"
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      onClick={() => onDeleteFromHistory(item.id)}
                      variant="outline"
                      size="icon"
                      className="corner-squircle h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            </div>
          )}
        </ScrollArea>
      </div>

      <Button
        onClick={onBack}
        variant="default"
        className="corner-superellipse/1.5"
      >
        Retour
      </Button>
    </Card>
  )
}
