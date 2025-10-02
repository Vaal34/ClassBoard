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
      className={`flex p-4 bg-violet-600 w-auto h-auto rounded-4xl ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex flex-col gap-4 w-full">
        <Select
          value={selectClass?.path || ""}
          onValueChange={handleSelectClass}
          disabled={disabled}
        >
          <SelectTrigger className="bg-white w-full rounded-2xl cursor-pointer">
            <SelectValue placeholder="Sélectionner une classe" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-0 data-[state=open]:slide-in-from-bottom-8 data-[state=open]:zoom-in-100 duration-400">
            {listClasses.map((data) => (
              <SelectItem
                key={data.id}
                value={data.path}
                className="cursor-pointer rounded-2xl border-0"
              >
                {data.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-4">
          <DialogClasse disabled={disabled} />
          <BtnDeleteClasse selectClass={selectClass} disabled={disabled} />
        </div>
      </div>
    </div>
  );
}

export default FormClass;