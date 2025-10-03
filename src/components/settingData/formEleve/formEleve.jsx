import BtnDeleteEleve from "./btnDeleteEleve";
import DialogEleve from "./DialogEleve";

function FormEleve({ selectClass, selectEleves }) {
  return (
    <div className="p-4 bg-card text-accent-foreground h-full rounded-4xl flex gap-4 justify-center">
        <DialogEleve selectClass={selectClass} />
        <BtnDeleteEleve selectEleves={selectEleves} selectClass={selectClass} />
    </div>
  );
}

export default FormEleve;
