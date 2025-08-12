// src/pages/RidePage.jsx
import { useState, useEffect } from 'react';
import {
  challenges,
  questions,
  polls,
  badges,
} from '../data/rideData';
import './RidePage.css';

const CHAPTERS = ['home', 'journal', 'challenges', 'trivia', 'polls', 'badges'];

function HomePanel({ onBegin }) {
  return (
    <div className="chapter-panel home">
      <h2>Arthur's Redemption Ride</h2>
      <p>Well, partner, you’ve ridden through these parts a few times. Let’s see how you fare this go-round.</p>
      <button onClick={onBegin} className="ride-button">Set Up Camp</button>
    </div>
  );
}

function JournalPanel({ onContinue }) {
  return (
    <div className="chapter-panel journal">
      <h2>Arthur's Journal</h2>
      <p>Memories from the trail...</p>
      <div className="entries-list">
        {journalEntries.map((entry, i) => (
          <article key={i} className="journal-entry">
            <div className="journal-date">{entry.date}</div>
            <p className="journal-text">{entry.text}</p>
            {entry.image && <img src={entry.image} alt={entry.caption} className="journal-image" />}
            {entry.caption && <p className="caption">{entry.caption}</p>}
          </article>
        ))}
      </div>
      <button onClick={onContinue} className="ride-button">Ride On</button>
    </div>
  );
}

function ChallengesPanel({ onUpdate }) {
  const [completed, setCompleted] = useState([]);

  const toggleChallenge = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((c) => c !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  return (
    <div className="chapter-panel challenges">
      <h2>Honor Challenges</h2>
      <p>How many have you really done, partner?</p>
      <ul className="challenges-list">
        {challenges.map((challenge) => (
          <li
            key={challenge.id}
            className={completed.includes(challenge.id) ? 'completed' : ''}
          >
            <label>
              <input
                type="checkbox"
                checked={completed.includes(challenge.id)}
                onChange={() => toggleChallenge(challenge.id)}
              />
              <span className="challenge-text">{challenge.text}</span>
              <span className="honor-badge">+{challenge.honor} Honor</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="stats">
        Completed: {completed.length} / {challenges.length}
        <button
          onClick={() => onUpdate(completed)}
          className="ride-button"
        >
          Continue Ride
        </button>
      </div>
    </div>
  );
}

function TriviaPanel({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const calculateHonor = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) score += 10;
    });
    return score;
  };

  return (
    <div className="chapter-panel trivia">
      <h2>Campfire Trivia</h2>
      <p>Test your knowledge, legend.</p>
      <div className="questions">
        {questions.map((q) => (
          <div key={q.id} className="question-card">
            <h3>{q.question}</h3>
            <div className="options">
              {q.options.map((opt, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    checked={answers[q.id] === i}
                    onChange={() => handleAnswer(q.id, i)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {showResult && (
              <div
                className={`result ${
                  answers[q.id] === q.answer ? 'correct' : 'incorrect'
                }`}
              >
                {answers[q.id] === q.answer
                  ? 'Correct!'
                  : `Incorrect. ${q.lore}`}
              </div>
            )}
          </div>
        ))}
      </div>
      {!showResult ? (
        <button
          onClick={() => setShowResult(true)}
          className="ride-button"
        >
          Check Answers
        </button>
      ) : (
        <>
          <div className="honor-reward">+{calculateHonor()} Honor</div>
          <button
            onClick={() => onComplete(calculateHonor())}
            className="ride-button"
          >
            Continue Ride
          </button>
        </>
      )}
    </div>
  );
}

function PollsPanel({ onComplete }) {
  const [votes, setVotes] = useState({});

  const vote = (pollId, option) => {
    setVotes({ ...votes, [pollId]: option });
  };

  return (
    <div className="chapter-panel polls">
      <h2>Story Polls</h2>
      <p>What would Arthur do?</p>
      <div className="polls-grid">
        {polls.map((poll) => (
          <div key={poll.id} className="poll-card">
            <h3>{poll.question}</h3>
            <div className="options">
              {poll.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => vote(poll.id, i)}
                  className={votes[poll.id] === i ? 'selected' : ''}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="results">
              You chose: {poll.options[votes[poll.id] ?? 0] || '—'}
            </div>
            <div className="lore">{poll.lore}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => onComplete(votes)}
        className="ride-button"
      >
        Continue Ride
      </button>
    </div>
  );
}

function BadgesPanel({ redemptionPoints }) {
  return (
    <div className="chapter-panel badges">
      <h2>Legendary Badges</h2>
      <p>Unlocked by true legends.</p>
      <div className="badge-grid">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`badge ${badge.unlocked ? 'unlocked' : 'locked'}`}
          >
            <div className="badge-icon">
              {badge.unlocked ? '🏆' : '🔒'}
            </div>
            <div className="badge-name">{badge.name}</div>
            <div className="badge-lore">{badge.lore}</div>
          </div>
        ))}
      </div>
      <div className="completion-message">
        <p>Redemption Points: {redemptionPoints}</p>
        <p className="arthur-quote">
          “Four times you’ve walked these trails, partner. Not many can say that.
          Happy trails, and see you around camp.”
        </p>
      </div>
    </div>
  );
}

export default function RidePage() {
  const [currentChapter, setCurrentChapter] = useState(CHAPTERS[0]);
  const [progress, setProgress] = useState({
    challengesCompleted: [],
    triviaScore: 0,
    pollsAnswered: {},
  });
  const [redemptionPoints, setRedemptionPoints] = useState(0);

  const unlockChapter = (chapter) => {
    setCurrentChapter(chapter);
  };

  const updateProgress = (key, value) => {
    setProgress({ ...progress, [key]: value });
  };

  return (
    <div className="ride-container">
      {currentChapter === 'home' && (
        <HomePanel onBegin={() => unlockChapter('journal')} />
      )}
      {currentChapter === 'journal' && (
        <JournalPanel onContinue={() => unlockChapter('challenges')} />
      )}
      {currentChapter === 'challenges' && (
        <ChallengesPanel
          onUpdate={(completed) => {
            updateProgress('challengesCompleted', completed);
            setRedemptionPoints(redemptionPoints + completed.length * 5);
            unlockChapter('trivia');
          }}
        />
      )}
      {currentChapter === 'trivia' && (
        <TriviaPanel
          onComplete={(score) => {
            updateProgress('triviaScore', score);
            setRedemptionPoints(redemptionPoints + score * 2);
            unlockChapter('polls');
          }}
        />
      )}
      {currentChapter === 'polls' && (
        <PollsPanel
          onComplete={() => {
            setRedemptionPoints(redemptionPoints + 10);
            unlockChapter('badges');
          }}
        />
      )}
      {currentChapter === 'badges' && (
        <BadgesPanel redemptionPoints={redemptionPoints} />
      )}
      <div className="redeem-bar">
        Redemption Points: {redemptionPoints}
      </div>
    </div>
  );
}
