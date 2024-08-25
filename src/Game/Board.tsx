import { useGameContext } from "../context/GameContext";
import Controls from "./Controls";

const Board = () => {
  const { score } = useGameContext()!;
  return (
    <div className="hidden lg:flex h-full bg-slate-700 shrink-0 px-10 py-10 flex-col items-center justify-center border-4 border-slate-300">
      <h2 className="text-slate-300 font-bold text-3xl">Score: {score}</h2>
      <Controls />
    </div>
  );
};

export default Board;
