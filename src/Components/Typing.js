import React, { useState, useEffect, useRef } from "react";
import "./Typing.css";

function Typing() {
  const STARTING_TIME = 20;

  const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog.";

  const [userInput, setUserInput] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const textBoxRef = useRef(null);

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setUserInput("");
    setWpm(0);
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function endGame() {
    setIsTimeRunning(false);
    calculateWPM();
  }

  function calculateWPM() {
    const sampleWords = SAMPLE_TEXT.trim().split(" ");
    const inputWords = userInput.trim().split(" ");
    let correct = 0;

    inputWords.forEach((word, i) => {
      if (word === sampleWords[i]) {
        correct++;
      }
    });

    const minutes = (STARTING_TIME - timeRemaining) / 60;
    const wordsPerMinute = Math.round(correct / minutes) || 0;
    setWpm(wordsPerMinute);
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div className="typing-speed">
      <h1>Typing Speed Test</h1>
      
      <div className="sample-text">
        <strong>Type this:</strong>
        <p>{SAMPLE_TEXT}</p>
      </div>

      <textarea
        ref={textBoxRef}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={!isTimeRunning}
        placeholder="Start typing the sample text here..."
      />

      <h4>Time Remaining: {timeRemaining} seconds</h4>
      <button onClick={startGame}>Start</button>

      {!isTimeRunning && timeRemaining === 0 && (
        <div>
          <h1>WPM: {wpm}</h1>
        </div>
      )}
    </div>
  );
}

export default Typing;
