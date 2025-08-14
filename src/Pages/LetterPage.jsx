import React from 'react';
import { letter } from '../data/letterData';
import './LetterPage.css';

export default function LetterPage() {
  return (
    <div className="letter-frame winter-night">
      {/* Snowflake elements (as many as you want for density) */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={`snowflake-${i}`}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          ❄
        </div>
      ))}

      {/* The letter paper is now a simple transparent overlay */}
      <div className="letter-paper">
        <div className="letter-content">
          <p className="glow-salutation">To: My Man Suri</p>
          <p style={{ marginBottom: '1rem' }}>Arthur Morgan Sends His Regards</p>
          <p style={{ marginTop: '2rem', marginBottom: '1rem' }}>From: All the Gang</p>
          <p style={{ textAlign: 'left' }}>Dearest Cowpoke, </p>
          <p>&nbsp;</p>
          <p style={{ textAlign: 'left' }}>
            This old paper has seen more miles than Arthur’s hat, and I reckon this note has as much heart.
            You’ve ridden these trails more times than anyone I know—through snow, through fire, through every last dinosaur bone.
            You’re a true four-time legend, and I’m proud to call you partner.
            <br /><br />
            Today, remember: you’re the reason camp feels like home.
            May your journey stay golden, and your honor never fade.
          </p>
          <br></br>
          <p>You are so special that the sky decided to celebrate you with the prettiest meteor shower of the year.</p>
          <p>&nbsp;</p>
          <p style={{ textAlign: 'right' }}>
            With true respect,
            <br />
            Arthur Morgan
          </p>
          <p>
            P.S. Don’t let the world dull your sparkle.
            <br />
            You’re a shining star, and the world needs your light.
            And remember that I am always by your side. Even when we are at our lowest. I hope this year is the happiest time for you. Remember I love you my king. ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
