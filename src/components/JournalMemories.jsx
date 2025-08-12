import React from "react";
import "./JournalMemory.css";

export default function JournalMemory({ image, caption }) {
  const today = new Date().toLocaleDateString();
  return (
    <div className="journal-entry">
      <div className="journal-date">{today}</div>
      <div className="journal-content">
        <div className="sketch-frame">
          <img className="journal-sketch" src={image} alt="Memory" />
        </div>
        <div className="journal-text">
          <p className="journal-writing">{caption}</p>
          <p className="journal-signature">— Arthur</p>
        </div>
      </div>
    </div>
  );
}
