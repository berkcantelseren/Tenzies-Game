import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import "./App.css";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  function hold(id) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={hold}
      id={dieObj.id}
    />
  ));

  return (
    <main>
      {gameWon && <ReactConfetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="dice-container">{diceElements}</div>

      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll Dice"}
      </button>
      {gameWon && <span className="win">🎉 You won!</span>}
    </main>
  );
}

export default App;
