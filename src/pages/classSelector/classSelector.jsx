import { Link } from "react-router-dom";
import "./classSelector.css";
import { ArrowRight, Bolt } from "lucide-react";
import { useClasses } from "../../hooks/useClasses";

function ClassSelector() {
  const { listClasses, isLoading, error } = useClasses();

  return (
    <div className="container-class-selector">
      <div className="header-selector">
        <span className="title-selector">CLASSBOARD.</span>
        <Link className="btn-setting-data" to={`/setting-class`}>
          <Bolt strokeWidth={1} />
        </Link>
      </div>
      <div className="grid-selector">
        {Object.values(listClasses).map((classe) => (
          <div className="selector-class-item" key={classe.id}>
            <div className="class-item-picture">
              <div className="block-text-item-picture">
                <span className="subtitle-class-item">classes</span>
                <span className="title-class-item">{classe.name}</span>
              </div>
            </div>
            <Link
              className="btn-class-selector"
              key={classe.id}
              to={`/classe/${classe.path}`}
            >
              <ArrowRight size={15} strokeWidth={1} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassSelector;
