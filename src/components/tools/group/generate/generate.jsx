import { useState, useEffect } from "react";
import {
  grouperAleatoireParNEleves,
  grouperAleatoireParNGroupes,
} from "../../../../scripts/randomiser";
import "./generate.css";
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
    <div className="generate-container">
      <div
        className="groupe-grid"
        style={{ gridTemplateColumns: getGridColumns() }}
      >
        {groupeList.map((groupe, index) => (
          <div key={index} className="groupe-card">
            <ul>
              {groupe.map((eleve) => (
                <li key={eleve.id}>
                  <span>
                    {eleve.prenom} {eleve.nom}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className="btn-reset" onClick={handleIsGenerate}>
        <RotateCcw size={15} />
      </button>
    </div>
  );
}

export default Generate;
