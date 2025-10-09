import BtnDeleteClasse from './btnDeleteClasse'
import BtnCreateClasse from './btnCreateClasse'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function FormClass({ selectClass, listClasses, handleSelectClass, disabled }) {
  return (
    <div
      className={`bg-card flex h-full w-1/2 flex-col gap-4 rounded-4xl p-4 ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      <div className="flex gap-2">
        <Select
          value={selectClass?.path || ''}
          onValueChange={handleSelectClass}
          disabled={disabled}
        >
          <SelectTrigger className="bg-background w-full cursor-pointer rounded-2xl font-extrabold uppercase">
            <SelectValue placeholder="Sélectionner une classe" />
          </SelectTrigger>
          <SelectContent className="bg-background data-[state=open]:slide-in-from-bottom-8 data-[state=open]:zoom-in-100 rounded-2xl border-0 p-1 duration-400">
            {listClasses.map((data) => (
              <SelectItem
                key={data.id}
                value={data.path}
                className="cursor-pointer rounded-2xl border-0 font-light uppercase transition-all duration-300 hover:font-semibold"
              >
                {data.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <BtnDeleteClasse selectClass={selectClass} disabled={disabled} />
      </div>
      <div className="flex-1">
        <BtnCreateClasse disabled={disabled} />
      </div>
    </div>
  )
}

export default FormClass
