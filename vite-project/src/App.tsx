import { useState } from 'react';
import './App.css';


import DiceImage1 from "./images/dice1.png";
import DiceImage2 from "./images/dice2.png";
import DiceImage3 from "./images/dice3.png";
import DiceImage4 from "./images/dice4.png";
import DiceImage5 from "./images/dice5.png";
import DiceImage6 from "./images/dice6.png";

function App() {
  var diceImages = [
    DiceImage1,
    DiceImage2,
    DiceImage3,
    DiceImage4,
    DiceImage5,
    DiceImage6
  ];

  const [image, setImage] = useState(diceImages[0]);
  const [image2, setImage2] = useState(diceImages[1]);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState("");
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [buttonEffect, setButtonEffect] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setWinner(""); // Kazanan metnini sıfırla
    setButtonEffect(false); // Butonu eski haline getir

    let rollInterval = setInterval(() => {
      setImage(diceImages[Math.floor(Math.random() * 6)]);
      setImage2(diceImages[Math.floor(Math.random() * 6)]);
    }, 100); // Her 100ms'de rastgele değiştir

    setTimeout(() => {
      clearInterval(rollInterval); // Rastgele döndürmeyi durdur
      var randomNum1 = Math.floor(Math.random() * 6);
      var randomNum2 = Math.floor(Math.random() * 6);
      
      setImage(diceImages[randomNum1]);
      setImage2(diceImages[randomNum2]);
      setIsRolling(false);
      setButtonEffect(true); // Butonu yeşile döndür

      if (randomNum1 > randomNum2) {
        setWinner(`${player1} Kazandı! 🎉`);
      } else if (randomNum1 < randomNum2) {
        setWinner(`${player2} Kazandı! 🎉`);
      } else {
        setWinner("Berabere! 🤝");
      }
    }, 3000);
  };


  return (
    <div className="App">
      <h1>Welcome to ULTIMATE DICE ROLLER</h1>

      <div className="dice-container">
        <div className="dice-box">
          <input
            type="text"
            className="player-input"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <img className="square" src={image} alt="Dice 1" />
        </div>

        <div className="dice-box">
          <input
            type="text"
            className="player-input"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <img className="square" src={image2} alt="Dice 2" />
        </div>
      </div>

      <button
  type="button"
  className={`btn ${buttonEffect ? "success" : ""}`}
  onClick={rollDice}
  disabled={isRolling}
>
  {isRolling ? "Rolling..." : "Roll Dice"}
</button>
      <h2>{winner}</h2>
    </div>
  );
}

export default App;
