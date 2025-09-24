import "./formClasse.css";
import { useCreateClasse } from "../../hooks/useCreateClasse";

function FormClass({ handleFormOpen }) {

  const createClasse = useCreateClasse();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);

    createClasse.mutate(
      {
        name: formData.get("name"),
        path: formData.get("path"),
      },
      {
        onSuccess: () => {
          form.reset();
          handleFormOpen();
        },
      }
    );
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input type="text" name="name" placeholder="Nom de la classe" />
      <input type="text" name="path" placeholder="URL de la classe" />
      <button type="submit" disabled={createClasse.isPending}>
        {createClasse.isPending ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}

export default FormClass;