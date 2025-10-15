import { useDeleteClasse } from '@/hooks/useDeleteClasse'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Trash2 } from '@/components/animate-ui/icons/trash-2'
import { toast } from 'sonner'

function BtnDeleteClasse({ selectClass, disabled }) {
  const deleteClass = useDeleteClasse()

  const handleDelete = (e) => {
    e?.stopPropagation?.()
    if (!selectClass) return
    deleteClass.mutate(
      { id: selectClass.id, path: selectClass.path },
      {
        onSuccess: () => {
          toast.success('Classe supprimée avec succès')
        },
        onError: (error) => {
          toast.error('Erreur lors de la suppression de la classe')
          console.error('Erreur lors de la suppression:', error)
        },
      }
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full">
        <Button
          variant="destructive"
          disabled={disabled || !selectClass}
          className="disabled:blur-[0.5px] font-clash flex h-full w-full flex-col p-6 text-lg font-extrabold uppercase"
        >
          <AnimateIcon
            animateOnHover
            className="flex flex-col items-center text-red-100"
          >
            <Trash2 className="size-8 stroke-1 text-red-800" />
          </AnimateIcon>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-8">
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. La classe "{selectClass?.name}" sera
            définitivement supprimée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteClass.isPending}
          >
            {deleteClass.isPending ? 'Suppression...' : 'Supprimer la classe'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BtnDeleteClasse
