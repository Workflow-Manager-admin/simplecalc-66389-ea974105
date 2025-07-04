import React, { useState } from 'react';
import './App.css';
import Calculator from './Calculator';
import AdditionGame from './AdditionGame';
import SubtractionGame from './SubtractionGame';
import MultiplicationGame from './MultiplicationGame';
import DivisionGame from './DivisionGame';
import FactorialGame from './FactorialGame';
import ModulusGame from './ModulusGame';

// PUBLIC_INTERFACE
function App() {
  // Mode: 'calc', 'add', 'sub', 'mul', 'div', 'fact', 'mod'
  const [mode, setMode] = useState('calc');

  let mainHeader = '';
  if (mode === 'calc') {
    mainHeader = "Calculator";
  } else if (mode === 'add') {
    mainHeader = "Addition Game";
  } else if (mode === 'sub') {
    mainHeader = "Subtraction Game";
  } else if (mode === 'mul') {
    mainHeader = "Multiplication Game";
  } else if (mode === 'div') {
    mainHeader = "Division Game";
  } else if (mode === 'fact') {
    mainHeader = "Factorial Game";
  } else if (mode === 'mod') {
    mainHeader = "Modulus Game";
  }

  return (
    <div className="App" style={{
      background: '#fafbfe',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <main style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.1rem',
          marginBottom: '1.7rem'
        }}>
          <button
            onClick={() => setMode('calc')}
            className="calc-btn"
            style={{
              background: mode === 'calc' ? '#1976d2' : '#ececec',
              color: mode === 'calc' ? '#fff' : '#1976d2',
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '10px',
              border: mode === 'calc' ? '1.5px solid #1976d2' : '1.2px solid #e5e7eb',
              boxShadow: mode === 'calc' ? '0 2px 6px #1976d226' : 'none',
              minWidth: 90,
              padding: '.62rem 0'
            }}
            aria-label="Switch to Calculator"
            tabIndex={0}
          >
            Calculator
          </button>
          <button
            onClick={() => setMode('add')}
            className="calc-btn"
            style={{
              background: mode === 'add' ? '#1976d2' : '#ececec',
              color: mode === 'add' ? '#fff' : '#1976d2',
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '10px',
              border: mode === 'add' ? '1.5px solid #1976d2' : '1.2px solid #e5e7eb',
              boxShadow: mode === 'add' ? '0 2px 6px #1976d226' : 'none',
              minWidth: 90,
              padding: '.62rem 0'
            }}
            aria-label="Switch to Addition Game"
            tabIndex={0}
          >
            Addition Game
          </button>
          <button
            onClick={() => setMode('sub')}
            className="calc-btn"
            style={{
              background: mode === 'sub' ? '#1976d2' : '#ececec',
              color: mode === 'sub' ? '#fff' : '#1976d2',
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '10px',
              border: mode === 'sub' ? '1.5px solid #1976d2' : '1.2px solid #e5e7eb',
              boxShadow: mode === 'sub' ? '0 2px 6px #1976d226' : 'none',
              minWidth: 90,
              padding: '.62rem 0'
            }}
            aria-label="Switch to Subtraction Game"
            tabIndex={0}
          >
            Subtraction Game
          </button>
          <button
            onClick={() => setMode('mul')}
            className="calc-btn"
            style={{
              background: mode === 'mul' ? '#1976d2' : '#ececec',
              color: mode === 'mul' ? '#fff' : '#1976d2',
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '10px',
              border: mode === 'mul' ? '1.5px solid #1976d2' : '1.2px solid #e5e7eb',
              boxShadow: mode === 'mul' ? '0 2px 6px #1976d226' : 'none',
              minWidth: 90,
              padding: '.62rem 0'
            }}
            aria-label="Switch to Multiplication Game"
            tabIndex={0}
          >
            Multiplication Game
          </button>
          <button
            onClick={() => setMode('div')}
            className="calc-btn"
            style={{
              background: mode === 'div' ? '#1976d2' : '#ececec',
              color: mode === 'div' ? '#fff' : '#1976d2',
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '10px',
              border: mode === 'div' ? '1.5px solid #1976d2' : '1.2px solid #e5e7eb',
              boxShadow: mode === 'div' ? '0 2px 6px #1976d226' : 'none',
              minWidth: 90,
              padding: '.62rem 0'
            }}
            aria-label="Switch to Division Game"
            tabIndex={0}
          >
            Division Game
          </button>
          <button
            onClick={() => setMode('fact')}
            className="calc-btn"
            style={{
              background: mode === 'fact' ? '#1976d2' : '#ececec',
              color: mode === 'fact' ? '#fff' : '#1976d2',
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '10px',
              border: mode === 'fact' ? '1.5px solid #1976d2' : '1.2px solid #e5e7eb',
              boxShadow: mode === 'fact' ? '0 2px 6px #1976d226' : 'none',
              minWidth: 90,
              padding: '.62rem 0'
            }}
            aria-label="Switch to Factorial Game"
            tabIndex={0}
          >
            Factorial Game
          </button>
          <button
            onClick={() => setMode('mod')}
            className="calc-btn"
            style={{
              background: mode === 'mod' ? '#1976d2' : '#ececec',
              color: mode === 'mod' ? '#fff' : '#1976d2',
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '10px',
              border: mode === 'mod' ? '1.5px solid #1976d2' : '1.2px solid #e5e7eb',
              boxShadow: mode === 'mod' ? '0 2px 6px #1976d226' : 'none',
              minWidth: 90,
              padding: '.62rem 0'
            }}
            aria-label="Switch to Modulus Game"
            tabIndex={0}
          >
            Modulus Game
          </button>
        </div>
        <h1 style={{
          letterSpacing: '1.25px',
          color: '#1976d2',
          marginBottom: '0.1em',
          fontWeight: 800,
          fontSize: '2.05rem'
        }}>{mainHeader}</h1>
        {mode === 'calc'
          ? <Calculator />
          : mode === 'add'
          ? <AdditionGame />
          : mode === 'sub'
          ? <SubtractionGame />
          : mode === 'mul'
          ? <MultiplicationGame />
          : mode === 'div'
          ? <DivisionGame />
          : mode === 'mod'
          ? <ModulusGame />
          : <FactorialGame />
        }
      </main>
      <footer style={{
          marginTop: 'auto',
          fontSize: '1rem',
          color: '#888',
          paddingBottom: '0.9rem'
        }} aria-label="footer"
      >
        &copy; {new Date().getFullYear()} Minimal React Calculator
      </footer>
    </div>
  );
}

export default App;
