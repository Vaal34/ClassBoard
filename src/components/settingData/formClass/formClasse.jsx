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
      className={`bg-card box-border flex h-full flex-col gap-4 rounded-xl px-6 py-2 ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      <div className="flex gap-2">
        <Select
          value={selectClass?.path || ''}
          onValueChange={handleSelectClass}
          disabled={disabled}
        >
          <SelectTrigger className="font-clash w-full cursor-pointer font-medium uppercase">
            <SelectValue placeholder="Sélectionner une classe" />
          </SelectTrigger>
          <SelectContent className="data-[state=open]:slide-in-from-bottom-8 data-[state=open]:zoom-in-100 rounded-4xl border-0 p-1 duration-400">
            {listClasses.map((data) => (
              <SelectItem
                key={data.id}
                value={data.path}
                className="font-clash cursor-pointer uppercase transition-all duration-500 hover:font-medium"
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
