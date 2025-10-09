import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useClasse } from '@/hooks/useClasse'
import { useClasses } from '@/hooks/useClasses'
import { useEleves } from '@/hooks/useEleves'
import FormClass from '@/components/settingData/formClass/formClasse'
import FormEleve from '@/components/settingData/formEleve/formEleve'
import { myTheme } from './agGridTheme'
import SwapData from '@/components/settingData/swapData'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

ModuleRegistry.registerModules([AllCommunityModule])

function SettingsData() {
  const { listClasses } = useClasses()
  const { allEleves } = useEleves()
  const [selectClass, setSelectClass] = useState()
  const [selectEleves, setSelectEleves] = useState([])
  const gridRef = useRef(null)
  const [swapData, setSwapData] = useState('byClass')
  const [quickFilterText, setQuickFilterText] = useState('')

  const { dataClasse } = useClasse(selectClass?.path)

  // Colonnes de base réutilisables
  const baseColumns = [
    {
      field: 'prenom',
      headerName: 'PRENOM',
      getQuickFilterText: (params) => params.value,
    },
    {
      field: 'nom',
      headerName: 'NOM',
      getQuickFilterText: (params) => params.value,
    },
  ]

  // Colonne classe
  const classeColumn = {
    field: 'classe.name',
    headerName: 'CLASSE',
    getQuickFilterText: () => '',
    cellRenderer: (params) => (
      <Badge className="from-chart-2 border-transparent bg-gradient-to-r to-blue-300 [background-size:105%] bg-center font-normal text-white">
        {params.value}
      </Badge>
    ),
  }

  const [colDefs, setColDefs] = useState(baseColumns)

  const defaultColDef = {
    flex: 1,
    minWidth: 120,
    resizable: false,
    // floatingFilter: true,
  }

  const handleSelectClass = (pathOrEvent) => {
    // Si c'est un événement (select HTML natif)
    const path = pathOrEvent?.target ? pathOrEvent.target.value : pathOrEvent
    const classe = Array.isArray(listClasses)
      ? listClasses.find((c) => c && c.path === path)
      : undefined
    setSelectClass(classe)
  }


  const handleSwapData = (data) => {
    setSwapData(data)
    // Utiliser les colonnes de base et ajouter conditionnellement la colonne classe
    setColDefs(
      data === 'byEleves' ? [...baseColumns, classeColumn] : baseColumns
    )
  }

  const rowSelection = useMemo(() => {
    return {
      mode: 'multiRow',
    }
  }, [])

  const onSelectionChanged = () => {
    const selectedRows = gridRef.current.api.getSelectedRows()
    setSelectEleves(selectedRows)
  }

  const handleQuickFilterChange = (event) => {
    const value = event.target.value
    setQuickFilterText(value)
  }

  useEffect(() => {
    if (listClasses.length === 0 && selectClass) {
      setSelectClass(undefined)
    }
    if (!selectClass) {
      setSelectClass(listClasses[0])
      return
    }
    const stillExists = listClasses.some((c) => c && c.id === selectClass.id)
    if (!stillExists) {
      setSelectClass(listClasses[0])
    }
  }, [listClasses])

  return (
    <div className="bg-background text-foreground flex h-screen flex-col gap-4 p-5">
      <div className="flex w-full gap-4">
        <FormClass
          selectClass={selectClass}
          listClasses={listClasses}
          handleSelectClass={handleSelectClass}
          disabled={swapData === 'byEleves'}
        />
        <FormEleve
          selectClass={selectClass?.path}
          selectEleves={selectEleves}
          activeSwap={swapData}
        />
        <SwapData handleSwapData={handleSwapData} activeSwap={swapData} />
      </div>
      <div className="flex items-center">
        <div className="relative">
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <Search className="size-4" />
          </div>
          <Input
            className="peer pl-9"
            type="text"
            placeholder="Recherche d'élève..."
            value={quickFilterText}
            onChange={handleQuickFilterChange}
          />
        </div>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={swapData === 'byClass' ? dataClasse?.eleves : allEleves}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        context={{ selectClass: selectClass?.path }}
        className="ag-theme-quartz h-full w-full"
        theme={myTheme}
        pagination={true}
        paginationPageSize={20}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        rowSelection={rowSelection}
        onSelectionChanged={onSelectionChanged}
        quickFilterText={quickFilterText}
        cacheQuickFilter={true}
        headerHeight={45}
        rowHeight={40}
        scrollbarWidth={0}
        suppressHorizontalScroll={true}
        suppressColumnVirtualisation={false}
        suppressRowVirtualisation={false}
      />
    </div>
  )
}

export default SettingsData
