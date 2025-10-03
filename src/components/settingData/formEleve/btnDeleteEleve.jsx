import { useDeleteEleve } from "@/hooks/useDeleteEleve";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "@/components/animate-ui/icons/trash-2";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

function BtnDeleteEleve({ selectEleves, selectClass }) {
  const deleteEleve = useDeleteEleve(selectClass);

  const handleDelete = (e) => {
    e?.stopPropagation?.();
    if (selectEleves.length === 0) return;
    const ids = selectEleves.map((eleve) => eleve.id);
    deleteEleve.mutate(ids);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={selectEleves.length === 0}
          className="uppercase text-xl h-full p-6 rounded-3xl border-0 flex flex-col gap-0 text-red-400 font-extrabold italic"
        >
          <AnimateIcon animateOnHover className="flex flex-col items-center">
            <Trash2 className="size-8 stroke-1 text-red-800" />
            Supprimer la selection
          </AnimateIcon>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-4xl border-0 p-8 bg-background text-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible.
            {selectEleves.length <= 1 ? " L'élève " : " Les élèves "}"
            {selectEleves
              .map((eleve) => `${eleve.prenom} ${eleve.nom}`)
              .join(", ")}
            "
            {selectEleves.length <= 1
              ? " sera définitivement supprimé."
              : " seront définitivement supprimés."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-2xl bg-secondary text-secondary-foreground border-0">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-2xl border-0"
            onClick={handleDelete}
          >
            {deleteEleve.isPending ? "Suppression..." : "Supprimer les élèves"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BtnDeleteEleve;
