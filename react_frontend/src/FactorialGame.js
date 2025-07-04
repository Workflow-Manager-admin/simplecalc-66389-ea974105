import React, { useState, useRef, useEffect } from 'react';
import './App.css';

/**
 * FactorialGame Component
 *
 * Presents random factorial challenges (random integer 1-7), accepts user answer (with keypad/keyboard support),
 * gives immediate feedback, tracks score, and allows reset/replay. Style is consistent with other game components.
 *
 * Props: none
 */

// PUBLIC_INTERFACE
function FactorialGame() {
  // Game state
  const [num, setNum] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const inputRef = useRef(null);

  // PUBLIC_INTERFACE
  function newProblem() {
    // Random integer from 1 to 7
    const n = Math.floor(Math.random() * 7) + 1;
    setNum(n);
    setAnswer('');
    setFeedback('');
    setShowNext(false);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  }

  useEffect(() => {
    newProblem();
    // eslint-disable-next-line
  }, []);

  // PUBLIC_INTERFACE
  function handleInput(e) {
    // Only allow positive integers
    const v = e.target.value;
    if (/^\d*$/.test(v)) {
      setAnswer(v);
      setFeedback('');
    }
  }

  // Handle Enter key for submit/next
  useEffect(() => {
    function keydown(e) {
      if (e.key === 'Enter' && !showNext) {
        checkAnswer();
      } else if (e.key === 'Enter' && showNext) {
        newProblem();
      }
    }
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
    // eslint-disable-next-line
  }, [showNext, answer, num]);

  // Helper to compute factorial
  function factorial(n) {
    let res = 1;
    for (let i = 2; i <= n; ++i) res *= i;
    return res;
  }

  // PUBLIC_INTERFACE
  function checkAnswer() {
    if (answer === '') {
      setFeedback('Please enter an answer.');
      return;
    }
    setAttempted(a => a + 1);
    const fact = factorial(num);
    if (+answer === fact) {
      setFeedback('Correct!');
      setScore(s => s + 1);
    } else {
      setFeedback(`Incorrect. ${num}! = ${fact}`);
    }
    setShowNext(true);
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    setScore(0);
    setAttempted(0);
    newProblem();
  }

  // Keypad (reuse layout)
  const digits = ['7','8','9','4','5','6','1','2','3','0'];
  const handleDigit = (d) => {
    setAnswer(ans => (ans.length < 8 ? ans + d : ans));
    setFeedback('');
    if (inputRef.current) inputRef.current.focus();
  };
  const handleBackspace = () => {
    setAnswer(ans => ans.slice(0, -1));
    setFeedback('');
    if (inputRef.current) inputRef.current.focus();
  };

  // Styles
  const borderColor = '#1976d2';
  const accent = '#fbc02d';
  const correctColor = '#43a047', errorColor = '#d32f2f';

  return (
    <div
      className="calc-main"
      style={{
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 16px rgba(25, 118, 210, .08)',
        padding: '2rem 1.2rem 1.2rem 1.2rem',
        margin: '1.5rem auto',
        maxWidth: 340,
        width: '90vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: '1.25rem',
          letterSpacing: '.5px',
          marginBottom: '0.5rem',
          color: borderColor
        }}
      >Factorial Game</div>

      {/* Problem Statement */}
      <div
        style={{
          background: '#f8fafc',
          borderRadius: '10px',
          border: `1.3px solid ${borderColor}33`,
          width: '100%',
          minHeight: '48px',
          marginBottom: '1.1rem',
          padding: '0.65rem 1rem 0.2rem 1rem',
          textAlign: 'center',
          fontSize: '2.1rem',
          color: '#424242',
          userSelect: 'none',
        }}
        aria-label="Current factorial problem"
      >
        {num !== null ? (<>{num}!&nbsp;=&nbsp;?</>) : (<span>Loading...</span>)}
      </div>

      {/* Input & Feedback */}
      <input
        ref={inputRef}
        type="text"
        value={answer}
        onChange={handleInput}
        disabled={showNext}
        style={{
          width: '90%',
          fontSize: '2rem',
          padding: '0.6rem .8rem',
          textAlign: 'center',
          marginBottom: '0.18rem',
          background: '#fff',
          border: `2px solid ${showNext && feedback.startsWith('Correct') ? correctColor : showNext && feedback.startsWith('Incorrect') ? errorColor : borderColor}55`,
          borderRadius: '7px',
          outline: 'none',
        }}
        maxLength={8}
        inputMode="numeric"
        autoFocus
        aria-label="Your answer"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            showNext ? newProblem() : checkAnswer();
          }
        }}
      />
      <div
        style={{
          fontSize: '1.10rem',
          minHeight: '1.8em',
          color: feedback.startsWith('Correct') ? correctColor : feedback.startsWith('Incorrect') ? errorColor : accent,
          marginBottom: feedback ? '.33rem' : '1.1rem',
          fontWeight: 500
        }}
        aria-live="polite"
      >
        {feedback}
      </div>

      {/* Keypad */}
      <div
        className="calc-keypad"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: '0.55rem',
          width: '100%',
          marginBottom: '.7rem'
        }}
      >
        {digits.map((d) =>
          <button
            key={d}
            className="calc-btn"
            style={{
              background: '#f9f9f9',
              color: '#424242',
              fontWeight: 500,
              fontSize: '1.07rem',
              minHeight: '44px',
              border: '1.2px solid #e5e7eb',
              borderRadius: '10px',
              transition: 'all 0.18s',
              cursor: showNext ? 'not-allowed' : 'pointer',
              opacity: showNext ? 0.65 : 1
            }}
            tabIndex={0}
            onClick={() => !showNext && handleDigit(d)}
            disabled={showNext}
            aria-label={d}
          >{d}</button>
        )}
        <button
          className="calc-btn"
          style={{
            gridColumn: '1 / span 2',
            background: '#ececec',
            color: '#424242',
            fontWeight: 500,
            fontSize: '1.05rem',
            minHeight: '44px',
            borderRadius: '10px'
          }}
          onClick={handleBackspace}
          aria-label="Backspace"
          disabled={showNext}
        >⌫</button>
        <button
          className="calc-btn"
          style={{
            background: '#1976d2',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.1rem',
            borderRadius: '10px',
            minHeight: '44px'
          }}
          onClick={showNext ? newProblem : checkAnswer}
          aria-label={showNext ? "Next" : "Submit"}
        >
          {showNext ? "Next" : "Submit"}
        </button>
      </div>

      {/* Score and Controls */}
      <div
        style={{
          marginTop: '.3rem',
          marginBottom: '.3rem',
          fontSize: '1rem',
          color: borderColor,
          fontWeight: 600
        }}
        aria-label="Score summary"
      >Score: {score} / {attempted}</div>
      <button
        className="calc-btn calc-clear"
        style={{
          marginTop: '0.5rem',
          padding: '0.6rem 1.4rem',
          background: '#ececec',
          color: '#1976d2',
          fontSize: '1rem',
          fontWeight: 700,
          border: '1.2px solid #e5e7eb',
          borderRadius: '10px',
          transition: 'all 0.18s',
          cursor: 'pointer'
        }}
        onClick={resetGame}
        aria-label="Reset game"
      >
        Reset
      </button>
    </div>
  );
}

export default FactorialGame;
