import React from 'react';
import './App.css';
import Calculator from './Calculator';

// PUBLIC_INTERFACE
function App() {
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
        <h1 style={{
          letterSpacing: '1.25px',
          color: '#1976d2',
          marginBottom: '0.1em',
          fontWeight: 800,
          fontSize: '2.05rem'
        }}>Calculator</h1>
        <Calculator />
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
