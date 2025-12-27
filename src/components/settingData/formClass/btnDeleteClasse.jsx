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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild className="w-full">
            <Button
              variant="destructive"
              disabled={disabled || !selectClass}
              className="corner-superellipse/1.5 font-clash flex h-full w-full flex-col p-6 text-lg font-extrabold uppercase disabled:blur-[0.5px]"
            >
              <AnimateIcon
                animateOnHover
                className="flex flex-col items-center text-red-100"
              >
                <Trash2 className="size-8 stroke-1 text-red-800" />
              </AnimateIcon>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent className="font-clash bg-red-200 text-lg font-extrabold text-red-800 uppercase [&_svg]:bg-red-200 [&_svg]:fill-red-200">
          Supprimer la classe
        </TooltipContent>
      </Tooltip>
      <AlertDialogContent className="corner-squircle p-8">
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. La classe "{selectClass?.name}" sera
            définitivement supprimée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="corner-superellipse/1.5">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteClass.isPending}
            variant="destructive"
            className="corner-superellipse/1.5"
          >
            {deleteClass.isPending ? 'Suppression...' : 'Supprimer la classe'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BtnDeleteClasse
