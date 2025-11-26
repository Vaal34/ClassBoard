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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

function BtnDeleteEleve({ selectEleves, selectClass }) {
  const deleteEleve = useDeleteEleve(selectClass)

  const handleDelete = (e) => {
    e?.stopPropagation?.()
    if (selectEleves.length === 0) return
    const ids = selectEleves.map((eleve) => eleve.id)
    deleteEleve.mutate(ids, {
      onSuccess: () => {
        toast.success('Élève(s) supprimé(s) avec succès')
      },
      onError: (error) => {
        toast.error("Erreur lors de la suppression de l'élève")
        console.error('Erreur lors de la suppression:', error)
      },
    })
  }

  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button
              size="icon"
              variant="destructive"
              disabled={selectEleves.length === 0}
              className="corner-superellipse/1.5 disabled:blur-[0.5px] font-clash flex h-full w-full flex-col gap-0 p-6 text-lg font-extrabold uppercase"
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
        <TooltipContent className="[&_svg]:bg-red-200 [&_svg]:fill-red-200 bg-red-200 text-red-800 font-clash text-lg font-extrabold uppercase">
          Supprimer l'élève
        </TooltipContent>
      </Tooltip>
      <AlertDialogContent className="p-8 corner-squircle">
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
          <AlertDialogCancel className="corner-superellipse/1.5">Annuler</AlertDialogCancel>
          <AlertDialogAction className="corner-superellipse/1.5" onClick={handleDelete} variant="destructive">
            {deleteEleve.isPending ? 'Suppression...' : 'Supprimer les élèves'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BtnDeleteEleve
