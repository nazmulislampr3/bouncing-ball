import { useGameContext } from "../context/GameContext";

const Ball = () => {
  const { gridUnit, ball } = useGameContext()!;
  const sx = 100 / gridUnit[0];
  const size = `${sx}%`;
  const left = `${sx * ball[0]}%`;
  const top = `${(100 / gridUnit[1]) * ball[1]}%`;

  return (
    <div
      className="bg-red-600 aspect-square absolute rounded-full"
      style={{
        width: size,
        left,
        top,
        background: `radial-gradient(#C8A1E0, #674188)`,
      }}
    ></div>
  );
};

export default Ball;
