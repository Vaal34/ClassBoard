import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useClasse } from "@/hooks/useClasse";
import { useClasses } from "@/hooks/useClasses";
import { useEleves } from "@/hooks/useEleves";
import FormClass from "@/components/settingData/formClass/formClasse";
import FormEleve from "@/components/settingData/formEleve/formEleve";
import { myTheme } from "./agGridTheme";
import SwapData from "@/components/settingData/swapData";

ModuleRegistry.registerModules([AllCommunityModule]);

function SettingsData() {
  const { listClasses } = useClasses();
  const { allEleves } = useEleves();
  const [selectClass, setSelectClass] = useState();
  const [selectEleves, setSelectEleves] = useState([]);
  const gridRef = useRef(null);
  const [swapData, setSwapData] = useState("byClass");

  const { dataClasse } = useClasse(selectClass?.path);

  const [colDefs, setColDefs] = useState([
    { field: "prenom", headerName: "Prénom" },
    { field: "nom", headerName: "Nom" },
  ]);

  const defaultColDef = {
    flex: 1,
    minWidth: 120,
    resizable: false,
    // floatingFilter: true,
  };

  const handleSelectClass = (pathOrEvent) => {
    // Si c'est un événement (select HTML natif)
    const path = pathOrEvent?.target ? pathOrEvent.target.value : pathOrEvent;
    const classe = Array.isArray(listClasses)
      ? listClasses.find((c) => c && c.path === path)
      : undefined;
    setSelectClass(classe);
  };

  const handleSwapData = (data) => {
    setSwapData(data);
  };

  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    setSelectEleves(selectedRows);
  }, []);

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
    <div className="p-5 h-screen flex-col flex gap-4 bg-background text-foreground">
      <div className="flex gap-4 w-full">
        <FormClass
          selectClass={selectClass}
          listClasses={listClasses}
          handleSelectClass={handleSelectClass}
          disabled={swapData === "byEleves"}
        />
        <FormEleve
          selectClass={selectClass?.path}
          selectEleves={selectEleves}
          activeSwap={swapData}
        />
        <SwapData handleSwapData={handleSwapData} activeSwap={swapData} />
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={swapData === "byClass" ? dataClasse?.eleves : allEleves}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        context={{ selectClass: selectClass?.path }}
        className="h-full w-full"
        theme={myTheme}
        pagination={true} 
        rowSelection={rowSelection}
        scrollbarWidth={0}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  );
}

export default SettingsData;


// Quand j'ajoute un élève dans un classe il ne se met pas dans la liste de tout les élèves

// Quand j'ajoutes un élève dans tous les éleves je devrais pouvoir le choisir une classe