import Game from "./components/Game";

const App = () => {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        background: `linear-gradient(to right bottom, #134B70, #677D6A)`,
      }}
    >
      <Game />
    </div>
  );
};

export default App;
