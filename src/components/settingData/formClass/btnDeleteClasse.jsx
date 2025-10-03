import { useDeleteClasse } from "@/hooks/useDeleteClasse";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Trash2 } from "@/components/animate-ui/icons/trash-2";

function BtnDeleteClasse({ selectClass, disabled }) {
  const deleteClass = useDeleteClasse();

  const handleDelete = () => {
    if (!selectClass) return;
    deleteClass.mutate({ id: selectClass.id, path: selectClass.path });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button variant="destructive" className="rounded-2xl border-0" disabled={disabled}>
        <AnimateIcon animateOnHover>
          <Trash2 className="size-4 stroke-1 text-red-500"/>
        </AnimateIcon>
      </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-4xl border-0 p-8 bg-background text-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. La classe "{selectClass?.name}" sera définitivement supprimée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-2xl bg-secondary text-secondary-foreground border-0">Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteClass.isPending}
            className="rounded-2xl border-0"
          >
            {deleteClass.isPending ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BtnDeleteClasse;