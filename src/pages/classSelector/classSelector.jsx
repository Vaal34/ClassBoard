import { Link } from "react-router-dom";
import "./classSelector.css";
import { ArrowRight } from "lucide-react";
import { useClasses } from "../../hooks/useClasses";

function ClassSelector() {
  const { listClasses, isLoading, error } = useClasses();

  return (
    <div className="container-class-selector">
      <span className="title-selector">Class</span>
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
              <ArrowRight size={15} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassSelector;
