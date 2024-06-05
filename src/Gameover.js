export default function Gameover({ onRestart }) {
  return (
    <div>
      <div>Guess Distribution </div>
      <div>
        <button onClick={() => onRestart()}>Play Again ?</button>
      </div>
    </div>
  );
}
