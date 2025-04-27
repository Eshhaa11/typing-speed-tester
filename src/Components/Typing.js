import React, { useState, useEffect, useRef } from "react";
import "./Typing.css";

function Typing() {
  const STARTING_TIME = 20; 

  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const textBoxRef = useRef(null);

 
  function handleChange(e) {
    setText(e.target.value);
  }


  function calculateWordCount(text) {
    const wordsArray = text.trim().split(" ").filter(word => word !== "");
    return wordsArray.length;
  }

  
  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText("");
    setWordCount(0);
    setWpm(0);
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  
  function endGame() {
    setIsTimeRunning(false);
    setWordCount(calculateWordCount(text));
    calculateWPM();
  }

  // Calculate WPM
  function calculateWPM() {
    const wordsTyped = calculateWordCount(text);
    const wpm = (wordsTyped / (STARTING_TIME - timeRemaining)) * 60;
    setWpm(Math.round(wpm));
  }

  
  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div className="typing-speed">
      <h1>Typing Speed Test</h1>

      <textarea
        ref={textBoxRef}
        value={text}
        onChange={handleChange}
        disabled={!isTimeRunning}
        placeholder="Start typing here..."
      />

      <h4>Time Remaining: {timeRemaining} seconds</h4>
      <button onClick={startGame}>Start</button>

      {isTimeRunning === false && timeRemaining === 0 && (
        <div>
          <h1>WPM: {wpm}</h1>
          <h4>Words Typed: {wordCount}</h4>
        </div>
      )}
    </div>
  );
}

export default Typing;
