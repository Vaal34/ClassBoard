import { useDeleteEleve } from '@/hooks/useDeleteEleve'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from '@/components/animate-ui/icons/trash-2'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { toast } from 'sonner'

function BtnDeleteEleve({ selectEleves, selectClass }) {
  const deleteEleve = useDeleteEleve(selectClass)

  const handleDelete = (e) => {
    e?.stopPropagation?.()
    if (selectEleves.length === 0) return
    const ids = selectEleves.map((eleve) => eleve.id)
    deleteEleve.mutate(ids, {
      onSuccess: () => {
        toast.success('Élève(s) supprimé(s) avec succès', {
          className: 'rounded-4xl',
          style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
          }
        })
      },
      onError: (error) => {
        toast.error('Erreur lors de la suppression de l\'élève', {
          className: 'rounded-4xl',
          style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-red-600), var(--color-red-400))',
            '--normal-border': 'light-dark(var(--color-red-600), var(--color-red-400))'
          }
        })
        console.error('Erreur lors de la suppression:', error)
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={selectEleves.length === 0}
          className="flex h-full flex-col gap-0 rounded-3xl border-0 p-6 text-xl font-extrabold text-red-400 uppercase"
        >
          <AnimateIcon animateOnHover className="flex flex-col items-center text-red-100">
            <Trash2 className="size-8 stroke-1 text-red-800" />
            Supprimer
          </AnimateIcon>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background text-foreground rounded-4xl border-0 p-8">
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible.
            {selectEleves.length <= 1 ? " L'élève " : ' Les élèves '}"
            {selectEleves
              .map((eleve) => `${eleve.prenom} ${eleve.nom}`)
              .join(', ')}
            "
            {selectEleves.length <= 1
              ? ' sera définitivement supprimé.'
              : ' seront définitivement supprimés.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-secondary text-secondary-foreground rounded-2xl border-0">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-2xl border-0"
            onClick={handleDelete}
          >
            {deleteEleve.isPending ? 'Suppression...' : 'Supprimer les élèves'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BtnDeleteEleve
