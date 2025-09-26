import { useEffect, useRef, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useClasse } from "../../hooks/useClasse";
import { useClasses } from "../../hooks/useClasses";
import "./settingsData.css";
import FormClass from "../../components/settingData/formClasse";
import FormEleve from "../../components/settingData/formEleve";
import BtnDeleteEleve from "../../components/settingData/btnDeleteEleve";
import BtnDeleteClasse from "../../components/settingData/btnDeleteClasse";
import { useDeleteClasse } from "../../hooks/useDeleteClasse";

ModuleRegistry.registerModules([AllCommunityModule]);

function SettingsData() {
  const { listClasses, isLoading, error } = useClasses();
  const [selectClass, setSelectClass] = useState();
  const [selectEleve, setSelectEleve] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const gridRef = useRef(null);

  const { dataClasse } = useClasse(selectClass?.path);


  const [colDefs, setColDefs] = useState([
    { field: "prenom", headerName: "Prenom" },
    { field: "nom", headerName: "Nom" },
    {
      headerName: "action",
      lockPosition: "right",
      cellRenderer: BtnDeleteEleve,
    },
  ]);

  const defaultColDef = {
    flex: 1,
  };

  const handleSelectClass = (e) => {
    const path = e.target.value;
    const classe = Array.isArray(listClasses)
      ? listClasses.find((c) => c && c.path === path)
      : undefined;
    setSelectClass(classe);
  };

  const handleFormOpen = () => {
    setFormOpen(!formOpen);
  };

  useEffect(() => {
    if (listClasses.length === 0 && selectClass) {
      setSelectClass(undefined);
    }
    if (!selectClass) {
      setSelectClass(listClasses[0]);
      return;
    }
    const stillExists = listClasses.some((c) => c && c.id === selectClass.id);
    if (!stillExists) {
      setSelectClass(listClasses[0]);
    }
  }, [listClasses]);

  return (
    <div className="setting-data-container">
      <select value={selectClass?.path || ""} onChange={handleSelectClass}>
        {listClasses.map((data) => (
          <option key={data.id} value={data.path}>
            {data.name}
          </option>
        ))}
      </select>
      <button onClick={handleFormOpen}>
        <span>Ajouter une classe</span>
      </button>
      <BtnDeleteClasse selectClass={selectClass} />
      {formOpen && <FormClass handleFormOpen={handleFormOpen} />}
      <FormEleve selectClass={selectClass?.path} />
      <AgGridReact
        ref={gridRef}
        rowData={dataClasse?.eleves || []}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        context={{ selectClass: selectClass?.path }}
        onCellClicked={(event) => {
          setSelectEleve(event.data);
        }}
      />
    </div>
  );
}

export default SettingsData;
