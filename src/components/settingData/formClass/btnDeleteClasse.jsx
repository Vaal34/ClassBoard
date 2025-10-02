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

function BtnDeleteClasse({ selectClass, disabled }) {
  const deleteClass = useDeleteClasse();

  const handleDelete = () => {
    if (!selectClass) return;
    deleteClass.mutate({ id: selectClass.id, path: selectClass.path });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button className="rounded-2xl border-0 cursor-pointer" disabled={disabled}>
        Supprimer la Classe
      </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. La classe "{selectClass?.name}" sera définitivement supprimée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteClass.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteClass.isPending ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BtnDeleteClasse;