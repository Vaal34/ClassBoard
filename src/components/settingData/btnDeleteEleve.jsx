import { X } from "lucide-react";
import { useDeleteEleve } from "../../hooks/useDeleteEleve";

function BtnDeleteEleve(params) {
  const row = params?.data;
  const selectClass = params?.context?.selectClass;
  const deleteEleve = useDeleteEleve(selectClass);

  const handleDelete = (e) => {
    e?.stopPropagation?.();
    if (!row) return;
    deleteEleve.mutate(
      { id: row.id },
      {
        onSuccess: () => {
          // succès silencieux
        },
        onError: (err) => {
          console.error("Suppression échouée", err, row);
        },
      }
    );
  };

  return (
    <button onClick={handleDelete}>
      <X strokeWidth={1} />
    </button>
  );
}

export default BtnDeleteEleve;


