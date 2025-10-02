function SwapData({ handleSwapData, activeSwap }) {
  return (
    <div className="p-4 bg-violet-600 flex flex-col items-center h-full rounded-2xl gap-4">
      <div className="text-black text-xl font-extralight">Choix de l'affichage</div>
      <div className="flex h-full w-full gap-4">
        <button
          className={`h-full w-full rounded-2xl cursor-pointer transition-all duration-300 border-4 ${
            activeSwap === "byEleves" 
              ? "bg-green-300 border-green-500" 
              : "bg-red-300 border-red-400 hover:bg-green-300 hover:border-green-500 active:bg-green-300 active:scale-95"
          }`}
          onClick={() => handleSwapData("byEleves")}
        >
          <span className="text-black font-extralight">ELEVES</span>
        </button>
        <button
          className={`h-full w-full rounded-2xl cursor-pointer transition-all duration-300 border-4 ${
            activeSwap === "byClass" 
              ? "bg-green-300 border-green-500" 
              : "bg-red-300 border-red-400 hover:bg-green-300 hover:border-green-500 active:bg-green-300 active:scale-95"
          }`}
          onClick={() => handleSwapData("byClass")}
        >
          <span className="text-black font-extralight">CLASSES</span>
        </button>
      </div>
    </div>
  );
}

export default SwapData;
