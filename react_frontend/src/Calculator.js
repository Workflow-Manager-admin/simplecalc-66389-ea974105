import React, { useState, useRef, useEffect } from 'react';

/**
 * Calculator Component
 * 
 * A minimalistic calculator supporting basic arithmetic operations.
 * - Features: Numeric keypad, arithmetic operations, clear/reset, responsive display, keyboard support
 * - Styling: Light theme, minimal UI using provided color palette
 * 
 * Props: none
 */
 // PUBLIC_INTERFACE
function Calculator() {
  // State for input/output
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Palette
  const colors = {
    primary: '#1976d2',
    secondary: '#424242',
    accent: '#fbc02d',
    bg: '#fff',
    text: '#222',
    keyBg: '#f9f9f9'
  };

  // Allowed buttons/labels in layout order
  const buttons = [
    { label: '7', type: 'digit' }, { label: '8', type: 'digit' }, { label: '9', type: 'digit' }, { label: '÷', type: 'op', value: '/' },
    { label: '4', type: 'digit' }, { label: '5', type: 'digit' }, { label: '6', type: 'digit' }, { label: '×', type: 'op', value: '*' },
    { label: '1', type: 'digit' }, { label: '2', type: 'digit' }, { label: '3', type: 'digit' }, { label: '-', type: 'op' },
    { label: '0', type: 'digit' }, { label: '.', type: 'dot' }, { label: 'C', type: 'clear' }, { label: '+', type: 'op' },
    { label: '=', type: 'equals' },
  ];

  // Keyboard support
  useEffect(() => {
    function handleKey(e) {
      // Map keys to button actions
      if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        updateInput(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        updateInput(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculateResult();
      } else if (e.key === 'Backspace') {
        setInput(s => s.slice(0, -1));
        setError('');
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clearAll();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line
  }, []);

  const updateInput = (val) => {
    setInput(s => s + val);
    setError('');
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  // Evaluate the input safely
  // PUBLIC_INTERFACE
  function calculateResult() {
    try {
      // Disallow unsupported characters
      if (/[^0-9+\-*/.]/.test(input)) {
        setError('Invalid input');
        setOutput('');
        return;
      }
      // Prevent multiple ops at end
      let exp = input.replace(/×/g, '*').replace(/÷/g, '/');
      if (/[*+\-/]$/.test(exp)) exp = exp.slice(0, -1);
      // eslint-disable-next-line no-eval
      // eval is safe here because we've sanitized the input
      // Limit float decimals
      const result = eval(exp);
      if (typeof result === 'undefined' || isNaN(result)) {
        setError('Error');
        setOutput('');
      } else {
        setOutput(String(Number(result.toFixed(8))));
        setInput('');
        setError('');
      }
    } catch {
      setError('Error');
      setOutput('');
    }
  }

  // PUBLIC_INTERFACE
  function handleButtonClick(b) {
    if (b.type === 'digit' || b.type === 'dot') {
      updateInput(b.label);
    } else if (b.type === 'op') {
      const val = b.value || b.label;
      updateInput(val);
    } else if (b.type === 'clear') {
      clearAll();
    } else if (b.type === 'equals') {
      calculateResult();
    }
  }

  // Responsive keypad grid style
  function getKeyClass(b) {
    if (b.type === 'op') return 'calc-btn calc-op';
    if (b.type === 'equals') return 'calc-btn calc-equals';
    if (b.type === 'clear') return 'calc-btn calc-clear';
    return 'calc-btn';
  }

  return (
    <div
      className="calc-main"
      style={{
        background: colors.bg,
        borderRadius: '18px',
        boxShadow: '0 4px 16px rgba(25, 118, 210, 0.08)',
        padding: '2rem 1.2rem 1.2rem 1.2rem',
        margin: '1.6rem auto',
        maxWidth: 340,
        minWidth: 240,
        width: '90vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Display */}
      <div
        className="calc-display"
        style={{
          background: '#f8fafc',
          color: colors.primary,
          width: '100%',
          minHeight: '56px',
          borderRadius: '10px',
          marginBottom: '1.2rem',
          padding: '0.6rem 1rem',
          fontSize: '2rem',
          textAlign: 'right',
          letterSpacing: '1px',
          boxShadow: '0 1px 2px rgba(33,33,33,0.04)',
          border: `1.3px solid ${colors.primary}33`
        }}
        tabIndex={0}
        aria-label="Calculator display"
        ref={inputRef}
      >
        <span style={{color: error ? '#d32f2f' : colors.secondary, fontSize: '1.1rem', float: 'left'}}>
          {error}
        </span>
        {input || output || 0}
      </div>

      {/* Keypad */}
      <div
        className="calc-keypad"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridGap: '0.55rem',
          width: '100%',
        }}
      >
        {buttons.map((b, idx) =>
          <button
            key={b.label}
            className={getKeyClass(b)}
            style={{
              background:
                b.type === 'op' ? colors.primary
                : b.type === 'equals' ? colors.accent
                : b.type === 'clear' ? '#ececec'
                : colors.keyBg,
              color:
                b.type === 'op' ? '#fff'
                : b.type === 'equals' ? colors.secondary
                : b.type === 'clear' ? colors.secondary
                : colors.secondary,
              border: b.type === 'equals' ? `2px solid ${colors.accent}` : '1.2px solid #e5e7eb',
              borderRadius: b.type === 'equals' ? '16px' : '10px',
              fontSize: b.type === 'equals' ? '1.25rem' : '1.05rem',
              fontWeight: b.type === 'equals' ? '700' : '500',
              padding: b.type === 'equals' ? '0.8rem 0' : '0.7rem 0',
              gridColumn: b.type === 'equals' ? '1 / span 4' : undefined,
              marginTop: b.type === 'equals' ? '0.55rem' : 0,
              cursor: 'pointer',
              transition: 'all 0.16s'
            }}
            tabIndex={0}
            onClick={() => handleButtonClick(b)}
            aria-label={b.label}
          >
            {b.label}
          </button>
        )}
      </div>
    </div>
  );
}

export default Calculator;
