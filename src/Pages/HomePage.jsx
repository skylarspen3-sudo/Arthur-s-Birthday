import React, { useState, useEffect } from "react";
import "../../src/App.css";

function useTypewriter(text, delay = 150) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (visibleChars < text.length) {
      const timeout = setTimeout(() => setVisibleChars(p => p + 1), delay);
      return () => clearTimeout(timeout);
    }
  }, [visibleChars, text, delay]);

  return (
    <>
      {Array.from(text).map((char, i) => (
        <span key={i} style={{ visibility: i < visibleChars ? "visible" : "hidden" }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <div className="background-container">
      <div className="centered-text">
        <h1 className="home-page-title">
          {useTypewriter("Happy Birthday Cowpoke! Your Journey Begins here.")}
        </h1>
      </div>
    </div>
  );
}
