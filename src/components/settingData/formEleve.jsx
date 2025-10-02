import { useState } from "react";
import { useCreateEleve } from "../../hooks/useCreateEleve";
import { useDeleteEleve } from "../../hooks/useDeleteEleve";

function FormEleve({ selectClass, selectEleves }) {
  const createEleve = useCreateEleve(selectClass);
  const deleteEleve = useDeleteEleve(selectClass);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!selectClass || !prenom.trim() || !nom.trim()) return;
    createEleve.mutate(
      { prenom: prenom.trim(), nom: nom.trim() },
      {
        onSuccess: () => {
          setPrenom("");
          setNom("");
        },
      }
    );
  };

  const handleDelete = (e) => {
    e?.stopPropagation?.();
    if (selectEleves.length === 0) return;
    const ids = selectEleves.map((eleve) => eleve.id);
    deleteEleve.mutate(ids);
  };

  return (
    <div className="p-4 bg-violet-600 h-full rounded-2xl">
      <form onSubmit={handleOnSubmit} className="flex">
        <div className="flex flex-col">
          <input
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <input
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <button type="submit" disabled={!selectClass || createEleve.isPending}>
          {createEleve.isPending ? "Ajout..." : "Ajouter l'élève"}
        </button>
      </form>
      <button disabled={selectEleves.length === 0} onClick={handleDelete}>
        {selectEleves.length <= 1
          ? "Supprimer l'élève"
          : "Supprimer les élèves"}
      </button>
    </div>
  );
}

export default FormEleve;
