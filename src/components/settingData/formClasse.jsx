import { useCreateClasse } from "../../hooks/useCreateClasse";
import { useState } from "react";
import BtnDeleteClasse from "./btnDeleteClasse";
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
} from "../ui/alert-dialog";


function FormClass({
  selectClass,
  listClasses,
  handleSelectClass,
  disabled,
}) {
  const [nameClass, setNameClass] = useState("");
  const [pathName, setPathName] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const createClasse = useCreateClasse();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!nameClass?.trim() || !pathName?.trim()) return;
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

  const handleFormOpen = () => {
    setFormOpen(!formOpen);
  };

  return (
    <div className={`flex p-4 bg-violet-600 w-auto h-full rounded-2xl ${disabled ? 'grayscale-100 pointer-events-none' : ''}`}>
      <div className="flex flex-col gap-4">
        <select
          value={selectClass?.path || ""}
          onChange={handleSelectClass}
          disabled={disabled}
        >
          {listClasses.map((data) => (
            <option key={data.id} value={data.path}>
              {data.name}
            </option>
          ))}
        </select>
        <div className="flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button>
                <span>Ajouter une classe</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Ajouter une nouvelle classe</AlertDialogTitle>
                <AlertDialogDescription>
                  Remplissez les informations pour créer une nouvelle classe.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form onSubmit={handleOnSubmit} className="space-y-4">
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
              </form>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => {
                  setNameClass("");
                  setPathName("");
                }}>
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleOnSubmit}
                  disabled={!nameClass?.trim() || !pathName?.trim() || createClasse.isPending}
                >
                  {createClasse.isPending ? "Ajout..." : "Ajouter"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <BtnDeleteClasse selectClass={selectClass} />
        </div>
      </div>
    </div>
  );
}

export default FormClass;