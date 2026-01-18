'use client';

import { useEffect, useState } from 'react';
import './display.css';

export default function DisplayPage() {
  const [lastNumber, setLastNumber] = useState(null);
  const [bingoMessage, setBingoMessage] = useState(null);

  useEffect(() => {
    // Initial load
    const stored = localStorage.getItem('lastBingoNumber');
    if (stored) {
      setLastNumber(JSON.parse(stored));
    }

    const storedBingo = localStorage.getItem('bingoMessage');
    if (storedBingo) {
      setBingoMessage(JSON.parse(storedBingo));
    }

    // Poll for updates every 100ms
    const interval = setInterval(() => {
      const stored = localStorage.getItem('lastBingoNumber');
      if (stored) {
        const data = JSON.parse(stored);
        setLastNumber(data);
      }

      const storedBingo = localStorage.getItem('bingoMessage');
      if (storedBingo) {
        const data = JSON.parse(storedBingo);
        setBingoMessage(data);
      } else {
        setBingoMessage(null);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getLetterColor = (letter) => {
    const letterColors = {
      B: "#e74c3c",
      I: "#3498db",
      N: "#2ecc71",
      G: "#f39c12",
      O: "#9b59b6"
    };
    return letterColors[letter] || "#333";
  };

  return (
    <div className="display-container">
      {bingoMessage ? (
        <div 
          className="display-content"
          style={{ 
            background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
            animation: 'pulse 1.5s infinite'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '16px', backgroundColor: '#ffffff88', padding: '8px 16px', borderRadius: '12px' }}>
            <img src="/njardvik.png" alt="Bingo Logo" className="logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }}/>
            <h1 style={{ fontSize: '60px', color: '#3D6B48'}}>BINGÓ</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px', fontWeight: 'bold', color: 'white', textShadow: '4px 4px 8px rgba(0,0,0,0.3)' }}>
            {bingoMessage.text}
          </div>
        </div>
      ) : lastNumber ? (
        <div 
          className="display-content"
          style={{ 
            background: `linear-gradient(135deg, ${getLetterColor(lastNumber.letter)}, ${getLetterColor(lastNumber.letter)}dd)`
          }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '16px', backgroundColor: '#ffffff88', padding: '8px 16px', borderRadius: '12px' }}>
                <img src="/njardvik.png" alt="Bingo Logo" className="logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }}/>
                <h1 style={{ fontSize: '60px', color: '#3D6B48'}}>BINGÓ</h1>
            </div>
          <div className="display-letter">{lastNumber.letter}</div>
          <div className="display-number">{lastNumber.number}</div>
        </div>
      ) : (
        <div className="waiting-content">
          <div className="waiting-text">Bíður eftir tölu...</div>
        </div>
      )}
    </div>
  );
}
