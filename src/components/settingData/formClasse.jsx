import "./formClasse.css";
import { useCreateClasse } from "../../hooks/useCreateClasse";
import { useState } from "react";

function FormClass({ handleFormOpen }) {
  const [nameClass, setNameClass] = useState();
  const [pathName, setPathName] = useState();

  const createClasse = useCreateClasse();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!nameClass.trim() || !pathName.trim()) return;
    createClasse.mutate(
      {
        name: nameClass.trim(),
        path: pathName.trim(),
      },
      {
        onSuccess: () => {
          setNameClass("");
          setPathName("");
          handleFormOpen();
        },
      }
    );
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nom de la classe"
        value={nameClass}
        onChange={(e) => setNameClass(e.target.value)}
      />
      <input
        type="text"
        name="path"
        placeholder="URL de la classe"
        value={pathName}
        onChange={(e) => setPathName(e.target.value)}
      />
      <button type="submit" disabled={!nameClass || !pathName}>
        {createClasse.isPending ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}

export default FormClass;
