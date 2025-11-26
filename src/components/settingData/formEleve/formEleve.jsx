import BtnDeleteEleve from './btnDeleteEleve'
import BtnCreateEleve from './btnCreateEleve'
import BtnUpdateEleve from './btnUpdateEleve'

function FormEleve({ selectClass, selectEleves, activeSwap }) {
  return (
    <div className="bg-background corner-squircle text-accent-foreground flex w-full justify-center gap-4 rounded-xl p-3">
      <div className="w-1/3">
        <BtnCreateEleve selectClass={selectClass} activeSwap={activeSwap} />
      </div>
      <div className="w-1/3">
        <BtnUpdateEleve selectClass={selectClass} activeSwap={activeSwap} />
      </div>
      <div className="w-1/3">
        <BtnDeleteEleve selectEleves={selectEleves} selectClass={selectClass} />
      </div>
    </div>
  )
}

export default FormEleve
