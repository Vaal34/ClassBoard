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
import { ArrowLeft, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

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
      <Badge className="font-normal">{params.value}</Badge>
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
    <div className="flex h-screen w-screen flex-col gap-4 p-5">
      <div className="flex flex-col">
        <h1 className="text-foreground font-clash text-4xl font-bold uppercase">
          Gestion des données
        </h1>
        <p className="text-muted-foreground">
          Gérez les données de vos classes et élèves
        </p>
      </div>
      <div className="flex h-full w-full gap-3">
        {/* Gestion classe et les élèves */}
        <div className="flex h-full flex-col gap-4">
          <FormClass
            selectClass={selectClass}
            disabled={swapData === 'byEleves'}
          />
          <FormEleve
            selectClass={selectClass?.path}
            selectEleves={selectEleves}
            activeSwap={swapData}
          />
          <SwapData handleSwapData={handleSwapData} activeSwap={swapData} />
          <div className="h-3/4 w-full">
            <Link to="/classes">
              <Button
                type="button"
                className="w-full h-full font-clash font-normal uppercase text-purple-900"
              >
                <ArrowLeft className="size-20 stroke-1" />
              </Button>
            </Link>
          </div>
        </div>
        {/* Grille des élèves */}
        <div className="flex h-full w-full flex-col items-center gap-4">
          <div className="flex w-full gap-3">
            <Select
              value={selectClass?.path || ''}
              onValueChange={handleSelectClass}
              disabled={swapData === 'byEleves'}
            >
              <SelectTrigger className="disabled:blur-[0.5px] bg-card text-card-foreground w-1/3 cursor-pointer font-medium italic shadow-none">
                <SelectValue placeholder="Sélectionner une classe" />
              </SelectTrigger>
              <SelectContent className="data-[state=open]:slide-in-from-bottom-8 data-[state=open]:zoom-in-100 rounded-4xl border-0 p-1 italic duration-400">
                {listClasses.map((data) => (
                  <SelectItem
                    key={data.id}
                    value={data.path}
                    className="focus:bg-accent/20 cursor-pointer transition-all duration-500 hover:font-medium"
                  >
                    {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputGroup className="w-full">
              <InputGroupInput
                placeholder="Recherche d'élève..."
                value={quickFilterText}
                onChange={handleQuickFilterChange}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
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
      </div>
    </div>
  )
}

export default SettingsData
