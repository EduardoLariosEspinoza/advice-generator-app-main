import { useState, useEffect, useRef } from "react";

import "./App.css";

import divider from "./assets/pattern-divider-desktop.svg";
import buttonImg from "./assets/icon-dice.svg";

function App() {
  const [buttonReset, setButtonReset] = useState(0);
  const [phrase, setPhrase] = useState("Loading...");
  let actualPhrase = useRef({ id: null, advice: "Loading..." });

  useEffect(() => {
    const fetchAdvice = async () => {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();

      if (data.slip.advice != actualPhrase.current.advice) {
        actualPhrase.current = data.slip;
        setPhrase(data.slip.advice);
      } else if (buttonReset > 0) {
        setTimeout(() => {
          setButtonReset((prev) => prev + 1);
        }, 800);
        setPhrase("Loading...");
      }
    };

    fetchAdvice();
  }, [buttonReset]);

  return (
    <div className="card">
      <p className="advice-number">
        {actualPhrase.current.advice != "Loading..."
          ? `Advice #${actualPhrase.current.id}`
          : "Loading..."}
      </p>
      <p className="advice">{actualPhrase.current.advice}</p>

      <img src={divider} alt="divider" className="divider" />

      <button
        onClick={() => setButtonReset((prev) => prev + 1)}
        disabled={phrase === "Loading..."}
      >
        <img src={buttonImg} alt="buttonImg" />
      </button>
    </div>
  );
}

export default App;
