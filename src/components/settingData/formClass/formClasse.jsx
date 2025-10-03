import BtnDeleteClasse from "./btnDeleteClasse";
import DialogClasse from "./dialogClasse";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FormClass({ selectClass, listClasses, handleSelectClass, disabled }) {
  return (
    <div
      className={`flex-col flex h-full w-1/2 gap-4 p-4 bg-card rounded-4xl ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex gap-2">
        <Select
          value={selectClass?.path || ""}
          onValueChange={handleSelectClass}
          disabled={disabled}
        >
          <SelectTrigger className="font-extrabold uppercase bg-background w-full rounded-2xl cursor-pointer">
            <SelectValue placeholder="Sélectionner une classe" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl p-1 border-0 bg-background data-[state=open]:slide-in-from-bottom-8 data-[state=open]:zoom-in-100 duration-400">
            {listClasses.map((data) => (
              <SelectItem
                key={data.id}
                value={data.path}
                className="font-light hover:font-semibold transition-all duration-300 uppercase cursor-pointer rounded-2xl border-0"
              >
                {data.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <BtnDeleteClasse selectClass={selectClass} disabled={disabled} />
      </div>
      <div className="flex-1">
        <DialogClasse disabled={disabled} />
      </div>
    </div>
  );
}

export default FormClass;
