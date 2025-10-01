import "./swapData.css";

function SwapData({ handleSwapData, activeSwap }) {
  return (
    <div className="setting-swap-container">
      <div className="setting-swap-label">Choix de l'affichage</div>
      <div className="setting-swap-btn-container">
        <button
          className={`setting-swap-btn ${
            activeSwap === "byEleves" ? "active" : ""
          }`}
          onClick={() => handleSwapData("byEleves")}
        >
          <span className="span-swap-btn">ELEVES</span>
        </button>
        <button
          className={`setting-swap-btn ${
            activeSwap === "byClass" ? "active" : ""
          }`}
          onClick={() => handleSwapData("byClass")}
        >
          <span className="span-swap-btn">CLASSES</span>
        </button>
      </div>
    </div>
  );
}

export default SwapData;
