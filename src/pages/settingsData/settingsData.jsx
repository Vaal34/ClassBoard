import { useRef, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useClasse } from "../../hooks/useClasse";
import { useClasses } from "../../hooks/useClasses";
import { X } from "lucide-react";
import "./settingsData.css";
import FormClass from "../../components/settingData/formClasse";

ModuleRegistry.registerModules([AllCommunityModule]);

function SettingsData() {
  const { listClasses, isLoading, error } = useClasses();
  const [selectClass, setSelectClass] = useState();
  const [selectEleve, setSelectEleve] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const gridRef = useRef(null);
  
  const { dataClasse } = useClasse(selectClass);

  const BtnDeleteRow = () => {
    return (
      <button>
        <X strokeWidth={1} />
      </button>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "prenom", headerName: "Prenom" },
    { field: "nom", headerName: "Nom" },
    {
      headerName: "action",
      lockPosition: "right",
      cellRenderer: BtnDeleteRow,
    },
  ]);

  const defaultColDef = {
    flex: 1,
  };

  const handleSelectClass = (e) => {
    setSelectClass(e.target.value);
  };

  const handleFormOpen = () => {
    setFormOpen(!formOpen);
  };

  return (
    <div className="setting-data-container">
      <select value={selectClass} onChange={handleSelectClass}>
        {listClasses.map((data) => (
          <option key={data.name} value={data.path}>
            {data.name}
          </option>
        ))}
      </select>
      <button onClick={handleFormOpen}>
        <span>Ajouter une classe</span>
      </button>
      {formOpen && (
        <FormClass handleFormOpen={handleFormOpen} />
      )}
      <AgGridReact
        ref={gridRef}
        rowData={dataClasse?.eleves || []}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        onCellClicked={(event) => {
          setSelectEleve(event.data);
        }}
      />
    </div>
  );
}

export default SettingsData;
