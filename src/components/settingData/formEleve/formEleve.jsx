import BtnDeleteEleve from "./btnDeleteEleve";
import DialogEleve from "./DialogEleve";

function FormEleve({ selectClass, selectEleves, activeSwap }) {
  return (
    <div className="p-4 bg-card text-accent-foreground h-full rounded-4xl flex gap-4 justify-center">
        <DialogEleve selectClass={selectClass} activeSwap={activeSwap} />
        <BtnDeleteEleve selectEleves={selectEleves} selectClass={selectClass} />
    </div>
  );
}

export default FormEleve;
