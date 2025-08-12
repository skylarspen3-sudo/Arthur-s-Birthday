import React, { useState, useEffect } from "react";
import '../../src/App.css';


function useTypewriter(text, delay = 150) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (visibleChars < text.length) {
      const timeout = setTimeout(() => setVisibleChars(p => p + 1), delay);
      return () => clearTimeout(timeout);
    }
  }, [visibleChars, text, delay]);

  return (
    <span className="home-typewrite">
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${i * delay}ms`,
            animationDuration: "0.001s",
            opacity: i < visibleChars ? 1 : 0
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
    <section className="fade-in">
      <div className="home-page-title">
        {useTypewriter("Happy  Birthday  Cowpoke!!")}
      </div>
      <img src="/Arthur-s-Birthday/arthur-morgan.gif" alt="Arthur Morgan Birthday GIF" />

    </section>
  );
}
