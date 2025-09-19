import Counter from "../../../../ui/Counter/counter";
import { Plus, Minus, Rocket } from "lucide-react";
import AnimatedList from "../../../../ui/AnimatedList/AnimatedList";
import "./settingGenerate.css";

export function SettingGenerate({ eleves, Gpvalue, Elvalue, increment, decrement, handleIsChecked, handleIsGenerate }) {
  return (
    <div className="setting-container">
      <div className="liste">
        <AnimatedList
          items={eleves}
          showGradients={false}
          enableArrowNavigation={false}
          displayScrollbar={false}
          isChecked={handleIsChecked}
        />
      </div>
      <div className="setting-block">
        <div className="nb-item">
          <span className="span-counter">nb. groupes</span>
          <div className="counter-grp">
            <button className="btn-counter" id="gp" onClick={decrement}>
              <Minus size={15} color="#681EEA" />
            </button>
            <Counter
              value={Gpvalue}
              gradientHeight={0}
              places={[10, 1]}
              fontSize={60}
              padding={0}
              gap={0}
              textColor="#000"
            />
            <button className="btn-counter" id="gp" onClick={increment}>
              <Plus size={15} color="#681EEA" />
            </button>
          </div>
          <button className="btn-generate" onClick={() => handleIsGenerate("gp")}>
            <Rocket size={15} />
          </button>
        </div>
        <div className="nb-item">
          <span className="span-counter">nb. élèves</span>
          <div className="counter-grp">
            <button className="btn-counter" id="el" onClick={decrement}>
              <Minus size={15} color="#681EEA" />
            </button>
            <Counter
              value={Elvalue}
              gradientHeight={0}
              places={[10, 1]}
              fontSize={60}
              padding={0}
              gap={0}
              textColor="#000"
            />
            <button className="btn-counter" id="el" onClick={increment}>
              <Plus size={15} color="#681EEA" />
            </button>
          </div>
          <button className="btn-generate" onClick={() => handleIsGenerate("el")}>
            <Rocket size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}