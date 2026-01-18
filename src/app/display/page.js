'use client';

import { useEffect, useState } from 'react';
import './display.css';

export default function DisplayPage() {
  const [lastNumber, setLastNumber] = useState(null);

  useEffect(() => {
    // Initial load
    const stored = localStorage.getItem('lastBingoNumber');
    if (stored) {
      setLastNumber(JSON.parse(stored));
    }

    // Poll for updates every 100ms
    const interval = setInterval(() => {
      const stored = localStorage.getItem('lastBingoNumber');
      if (stored) {
        const data = JSON.parse(stored);
        setLastNumber(data);
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
      {lastNumber ? (
        <div 
          className="display-content"
          style={{ 
            background: `linear-gradient(135deg, ${getLetterColor(lastNumber.letter)}, ${getLetterColor(lastNumber.letter)}dd)`
          }}
        >
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
