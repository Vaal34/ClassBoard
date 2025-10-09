import BtnDeleteEleve from './btnDeleteEleve'
import BtnCreateEleve from './btnCreateEleve'
import BtnUpdateEleve from './btnUpdateEleve'

function FormEleve({ selectClass, selectEleves, activeSwap }) {
  return (
    <div className="rounded-xl bg-card text-accent-foreground flex h-full justify-center gap-4 p-4">
      <BtnCreateEleve selectClass={selectClass} activeSwap={activeSwap} />
      <BtnUpdateEleve selectClass={selectClass} activeSwap={activeSwap} />
      <BtnDeleteEleve selectEleves={selectEleves} selectClass={selectClass} />
    </div>
  )
}

export default FormEleve
