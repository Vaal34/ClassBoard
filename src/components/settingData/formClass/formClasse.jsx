import BtnDeleteClasse from './btnDeleteClasse'
import BtnCreateClasse from './btnCreateClasse'

function FormClass({ selectClass, disabled }) {
  return (
    <div className="bg-card text-accent-foreground flex w-full justify-center gap-4 rounded-xl p-2">
      <div className="w-full h-full">
        <BtnCreateClasse disabled={disabled} />
      </div>
      <div className="w-full h-full">
        <BtnDeleteClasse selectClass={selectClass} disabled={disabled} />
      </div>
    </div>
  )
}

export default FormClass
