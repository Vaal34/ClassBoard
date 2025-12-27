import BtnDeleteClasse from './btnDeleteClasse'
import BtnCreateClasse from './btnCreateClasse'

function FormClass({ selectClass, disabled }) {
  return (
    <div className="bg-background corner-squircle text-accent-foreground flex w-full justify-center gap-4 rounded-xl p-3">
      <div className="h-full w-full">
        <BtnCreateClasse disabled={disabled} />
      </div>
      <div className="h-full w-full">
        <BtnDeleteClasse selectClass={selectClass} disabled={disabled} />
      </div>
    </div>
  )
}

export default FormClass
