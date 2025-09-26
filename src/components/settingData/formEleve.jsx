import { useState } from "react";
import { useCreateEleve } from "../../hooks/useCreateEleve";
import "./formClasse.css"

function FormEleve({ selectClass }) {
  const createEleve = useCreateEleve(selectClass);
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

  return (
    <form onSubmit={handleOnSubmit} style={{ display: "flex", gap: 8, margin: "12px 0" }}>
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
      <button type="submit" disabled={!selectClass || createEleve.isPending}>
        {createEleve.isPending ? "Ajout..." : "Ajouter l'élève"}
      </button>
    </form>
  );
}

export default FormEleve;


