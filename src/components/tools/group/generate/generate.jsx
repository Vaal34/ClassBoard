import { useState, useEffect } from "react";
import {
  grouperAleatoireParNEleves,
  grouperAleatoireParNGroupes,
} from "@/scripts/randomiser";
import { RotateCcw } from "lucide-react";

export function Generate({ eleves, Elvalue, Gpvalue, method, handleIsGenerate }) {
  const [groupeList, setGroupeList] = useState([]);

  useEffect(() => {
    if (!eleves || eleves.length === 0) {
      setGroupeList([]);
      return;
    }

    if (method === "gp") {
      setGroupeList(grouperAleatoireParNGroupes(eleves, Gpvalue));
    } else if (method === "el") {
      setGroupeList(grouperAleatoireParNEleves(eleves, Elvalue));
    }
  }, [method]);

  // Calculer le nombre de colonnes en fonction du nombre de groupes
  const getGridColumns = () => {
    const groupCount = groupeList.length;
    if (groupCount === 0) return "1fr";
    if (groupCount === 1) return "1fr";
    if (groupCount === 2) return "repeat(2, 1fr)";
    if (groupCount <= 4) return "repeat(2, 1fr)";
    if (groupCount <= 6) return "repeat(3, 1fr)";
    if (groupCount <= 9) return "repeat(3, 1fr)";
    if (groupCount > 10) return "repeat(4, 1fr)";
    return "repeat(auto-fit, minmax(250px, 1fr))";
  };

  return (
    <div className="flex flex-col gap-4 shadow-lg rounded-3xl overflow-hidden  p-4 relative cursor-pointer bg-white">
      <div
        className="grid  gap-4"
        style={{ gridTemplateColumns: getGridColumns() }}
      >
        {groupeList.map((groupe, index) => (
          <div key={index} className=" flex w-full h-full rounded-2xl p-4 gap-4 bg-gray-100">
            <ul className="flex flex-col gap-2 list-none p-0 m-0 w-full">
              {groupe.map((eleve) => (
                <li key={eleve.id} className="p-2 rounded-xl transition-colors duration-200 ease shadow-md bg-white">
                  <span className="block whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-medium">
                    {eleve.prenom} {eleve.nom}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className="p-4 border-none flex justify-center items-center cursor-pointer rounded-2xl font-extralight italic mb-1 transition-all duration-500 ease bg-purple-50 text-purple-600 hover:bg-gray-300 hover:text-gray-800 active:bg-purple-200 active:text-white hover:[&_svg]:animate-spin" onClick={handleIsGenerate}>
        <RotateCcw size={15} strokeWidth={1}/>
      </button>
    </div>
  );
}

export default Generate;
