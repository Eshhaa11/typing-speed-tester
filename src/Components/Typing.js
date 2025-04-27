import React, { useState, useEffect } from "react";

const sampleText = "Use Your Time Wisely.";

function Typing() {
  const [text] = useState(sampleText);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [isRunning, timeLeft]);

  const startGame = () => {
    setIsRunning(true);
    setInput("");
    setTimeLeft(30);
    setWpm(0);
  };

  const endGame = () => {
    setIsRunning(false);
    const wordCount = input.trim().split(/\s+/).length;
    setWpm(wordCount * 2); 
  };

  const handleInputChange = (e) => {
    if (!isRunning) return;
    setInput(e.target.value);
  };

  return (
    <div className="test-container">
      <h1>Typing Speed Test</h1>

      <div className="text-display">{text}</div>

      <textarea
        className="text-area"
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        disabled={!isRunning || timeLeft === 0}
      />

      <div className="info">
        <p>Time Left: {timeLeft}s</p>
        <p>WPM: {wpm}</p>
      </div>

      <button onClick={startGame} className="start-button">
        {isRunning ? "Running..." : "Start"}
      </button>
    </div>
  );
}

export default Typing;
