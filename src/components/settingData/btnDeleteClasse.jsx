import { useDeleteClasse } from "../../hooks/useDeleteClasse";
import "./btnDeleteClasse.css";

function BtnDeleteClasse({ selectClass }) {
  const deleteClass = useDeleteClasse();

  const handleDelete = () => {
    if (!selectClass) return;
    deleteClass.mutate({ id: selectClass.id, path: selectClass.path });
  };

  return (
    <button onClick={handleDelete} disabled={!selectClass}>
      {deleteClass.isPending ? "Suppression..." : "Suppprimer la Classe"}
    </button>
  );
}

export default BtnDeleteClasse;


