import React, { useState } from 'react';
import './App.css';
import Calculator from './Calculator';
import AdditionGame from './AdditionGame';

// PUBLIC_INTERFACE
function App() {
  // Mode: 'calc' or 'game'
  const [mode, setMode] = useState('calc');

  const mainHeader = mode === 'calc' ? "Calculator" : "Addition Game";
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
            onClick={() => setMode('game')}
            className="calc-btn"
            style={{
              background: mode === 'game' ? '#1976d2' : '#ececec',
              color: mode === 'game' ? '#fff' : '#1976d2',
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '10px',
              border: mode === 'game' ? '1.5px solid #1976d2' : '1.2px solid #e5e7eb',
              boxShadow: mode === 'game' ? '0 2px 6px #1976d226' : 'none',
              minWidth: 90,
              padding: '.62rem 0'
            }}
            aria-label="Switch to Game"
            tabIndex={0}
          >
            Game
          </button>
        </div>
        <h1 style={{
          letterSpacing: '1.25px',
          color: '#1976d2',
          marginBottom: '0.1em',
          fontWeight: 800,
          fontSize: '2.05rem'
        }}>{mainHeader}</h1>
        {mode === 'calc' ? <Calculator /> : <AdditionGame />}
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
