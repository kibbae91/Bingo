"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState({
    B: false,
    I: false,
    N: false,
    G: false,
    O: false
  });

  useEffect(() => {
    // Draw first number on mount
    const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomNumber = availableNumbers[randomIndex];
    setSelectedNumbers([randomNumber]);
    setCurrentNumber(randomNumber);
  }, []);

  const handleLetterToggle = (letter) => {
    // Clear all selected numbers when changing letter selection
    setSelectedNumbers([]);
    setCurrentNumber(null);
    
    setSelectedLetters(prev => ({
      ...prev,
      [letter]: !prev[letter]
    }));
  };

  const getAvailableNumbers = () => {
    const activeLetters = Object.keys(selectedLetters).filter(letter => selectedLetters[letter]);
    
    // If no letters selected, use all numbers
    if (activeLetters.length === 0) {
      return Array.from({ length: 75 }, (_, i) => i + 1);
    }

    // Get number ranges for selected letters
    const ranges = {
      B: [1, 15],
      I: [16, 30],
      N: [31, 45],
      G: [46, 60],
      O: [61, 75]
    };

    const availableNumbers = [];
    activeLetters.forEach(letter => {
      const [min, max] = ranges[letter];
      for (let i = min; i <= max; i++) {
        availableNumbers.push(i);
      }
    });

    return availableNumbers;
  };

  const selectRandomNumber = () => {
    const availableNumbers = getAvailableNumbers();
    const unselectedNumbers = availableNumbers.filter(num => !selectedNumbers.includes(num));

    if (unselectedNumbers.length === 0) {
      alert("All numbers from selected letters have been drawn!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * unselectedNumbers.length);
    const randomNumber = unselectedNumbers[randomIndex];
    
    setSelectedNumbers([...selectedNumbers, randomNumber]);
    setCurrentNumber(randomNumber);
  };

  const startNewGame = () => {
    setSelectedNumbers([]);
    setCurrentNumber(null);
    // Draw the first number after a brief delay
    // setTimeout(() => {
    //   const availableNumbers = getAvailableNumbers();
    //   const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    //   const randomNumber = availableNumbers[randomIndex];
    //   setSelectedNumbers([randomNumber]);
    //   setCurrentNumber(randomNumber);
    // }, 100);
  };

  const getBingoLetter = (number) => {
    if (number >= 1 && number <= 15) return "B";
    if (number >= 16 && number <= 30) return "I";
    if (number >= 31 && number <= 45) return "N";
    if (number >= 46 && number <= 60) return "G";
    if (number >= 61 && number <= 75) return "O";
    return "";
  }

  const getLetterColor = (letter) => {
    const letterColors = {
      B: "#e74c3c",
      I: "#3498db",
      N: "#2ecc71",
      G: "#f39c12",
      O: "#9b59b6"
    };
    return letterColors[letter];
  }

  const renderBingoBoard = () => {
    const columns = {
      B: Array.from({ length: 15 }, (_, i) => i + 1),
      I: Array.from({ length: 15 }, (_, i) => i + 16),
      N: Array.from({ length: 15 }, (_, i) => i + 31),
      G: Array.from({ length: 15 }, (_, i) => i + 46),
      O: Array.from({ length: 15 }, (_, i) => i + 61)
    };

    const letterColors = {
      B: "#e74c3c",
      I: "#3498db",
      N: "#2ecc71",
      G: "#f39c12",
      O: "#9b59b6"
    };

    return (
      <div className="bingo-board">
        <h2 className="board-title">Bingo Borð</h2>
        <div className="board-grid">
          {["B", "I", "N", "G", "O"].map(letter => (
            <div key={letter} className="board-column">
              <div 
                className="column-header"
                style={{ backgroundColor: letterColors[letter] }}
              >
                {letter}
              </div>
              <div className="column-numbers">
                {columns[letter].map(num => (
                  <div
                    key={num}
                    className={`number-cell ${selectedNumbers.includes(num) ? 'selected' : ''} ${num === currentNumber ? 'current' : ''}`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">🎉 Jóla Bingó</h1>
        <p className="subtitle">Uppáhalds Jólabingóið okkar</p>
      </div>
      
      <div className="content-wrapper">
        <div className="control-panel">
          {/* Letter Selection */}
          <div className="section card">
            <h2 className="section-title">Veldu Stafi</h2>
            <div className="letter-selector">
              {["B", "I", "N", "G", "O"].map((letter, index) => (
                <label 
                  key={letter} 
                  className={`letter-checkbox ${selectedLetters[letter] ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <input
                    type="checkbox"
                    checked={selectedLetters[letter]}
                    onChange={() => handleLetterToggle(letter)}
                    className="checkbox-input"
                  />
                  <span className="letter-label">{letter}</span>
                </label>
              ))}
            </div>
            <p className="info-text">
              {Object.values(selectedLetters).every(v => !v) 
                ? "📢 Allar tölur (1-75) í boði" 
                : `🎯 Spila: ${Object.keys(selectedLetters).filter(l => selectedLetters[l]).join(", ")}`}
            </p>
          </div>

          {/* Current Number Display */}
          {currentNumber && (
            <div className="current-number-display" style={{ 
              background: `linear-gradient(135deg, ${getLetterColor(getBingoLetter(currentNumber))}, ${getLetterColor(getBingoLetter(currentNumber))}dd)`
            }}>
              <div className="current-number">
                <span className="number-letter">{getBingoLetter(currentNumber)}</span>
                <span className="number-value">{currentNumber}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="button-group">
            <button onClick={selectRandomNumber} className="btn btn-primary">
              🎲 Dragðu tölu
            </button>
            <button onClick={startNewGame} className="btn btn-secondary">
              🎮 Byrja nýjan leik
            </button>
          </div>

          {/* Statistics */}
          <div className="section card stats">
            <div className="stat-item">
              <span className="stat-label">Tölur dregnar</span>
              <span className="stat-value">{selectedNumbers.length} / 75</span>
            </div>
            {selectedNumbers.length > 0 && (
              <div className="recent-numbers">
                <span className="recent-label">Nýjustu: </span>
                {selectedNumbers.slice(-5).reverse().map(num => (
                  <span key={num} className="recent-number">
                    {getBingoLetter(num)}-{num}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bingo Board */}
        <div className="board-container">
          {renderBingoBoard()}
        </div>
      </div>
    </div>
  );
}
