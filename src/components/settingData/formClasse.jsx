import "./formClasse.css";
import { useCreateClasse } from "../../hooks/useCreateClasse";
import { useState } from "react";
import BtnDeleteClasse from "./btnDeleteClasse";

function FormClass({
  selectClass,
  listClasses,
  handleSelectClass,
  disabled,
}) {
  const [nameClass, setNameClass] = useState();
  const [pathName, setPathName] = useState();
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
    <div className={`setting-class-container ${disabled ? 'disabled' : ''}`}>
      <div className="class-selection">
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
        <div className="setting-data-class-btn">
          <button onClick={handleFormOpen}>
            <span>Ajouter une classe</span>
          </button>
          <BtnDeleteClasse selectClass={selectClass} />
        </div>
      </div>

      {formOpen && (
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
      )}
    </div>
  );
}

export default FormClass;
