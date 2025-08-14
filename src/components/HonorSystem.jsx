import { useState, useEffect } from 'react';
import './HonorSystem.css';

const HONOR_ACTIONS = {
  good: [
    { 
      action: "Eat Healthy", 
      points: 25, 
      emoji: "💝",
      description: "Taking Care is Very important"
    },
    { 
      action: "Sleep Early", 
      points: 15, 
      emoji: "🌟",
      description: "Prioritize rest and rejuvenation"
    },
    { 
      action: "Text your loved ones", 
      points: 30, 
      emoji: "🤝",
      description: "Reach out and show you care"
    },
    { 
      action: "Be kind", 
      points: 40, 
      emoji: "💰",
      description: "Brighten someone's day with kind words"
    },
    { 
      action: "Listen to Someone", 
      points: 20, 
      emoji: "👂",
      description: "Be there for someone who needs to talk"
    }
  ],
  bad: [
    { 
      action: "Start Drama", 
      points: -20, 
      emoji: "🎭",
      description: "Stir up some trouble for fun"
    },
    { 
      action: "Smoke", 
      points: -15, 
      emoji: "💡",
      description: "Harm your body and mind"
    },
    { 
      action: "Ignore Someone", 
      points: -25, 
      emoji: "👻",
      description: "Give someone the cold shoulder"
    },
    { 
      action: "Be Selfish", 
      points: -22, 
      emoji: "🙄",
      description: "Only think about yourself"
    },
    { 
      action: "Break a Promise", 
      points: -30, 
      emoji: "💔",
      description: "Go back on your word"
    }
  ]
};

const ARTHUR_REACTIONS = {
  high: [
    "You're a good person, and that's rarer than you'd think.",
    "Arthur tips his hat. 'Much obliged, partner.'",
    "That's the way to do it. You got a good heart.",
    "Keep it up, friend. The world needs more folks like you.",
    "Arthur smiles warmly. 'You remind me of the good times.'",
    "Now that's what I call being a real stand-up person.",
    "Dutch would be proud of you, partner.",
    "You're the kind of person this world needs more of."
  ],
  low: [
    "Arthur shakes his head disapprovingly...",
    "Well, I seen worse... but not by much.",
    "That ain't right, and you know it.",
    "Arthur sighs. 'We all got darkness, but you don't gotta feed it.'",
    "Maybe think twice next time, partner.",
    "Micah would be proud of that choice...",
    "That's a low blow, even for an outlaw.",
    "You're better than that, aren't you?"
  ],
  neutral: [
    "Arthur observes quietly from his horse...",
    "Every choice matters, one way or another.",
    "What kind of person do you want to be?",
    "Life's full of tough choices, partner.",
    "We all got good and bad in us."
  ]
};

export default function HonorSystem() {
  const [honor, setHonor] = useState(0);
  const [message, setMessage] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [recentAction, setRecentAction] = useState('');
  const [actionCount, setActionCount] = useState(0);

  const getHonorLevel = () => {
    if (honor > 60) return 'Saint';
    if (honor > 30) return 'Good';
    if (honor > -30) return 'Neutral';
    if (honor > -60) return 'Bad';
    return 'Outlaw';
  };

  const getArthurReaction = () => {
    if (honor > 20) return ARTHUR_REACTIONS.high;
    if (honor < -20) return ARTHUR_REACTIONS.low;
    return ARTHUR_REACTIONS.neutral;
  };

  const performAction = (actionObj) => {
    setHonor(prev => Math.max(-100, Math.min(100, prev + actionObj.points)));
    setRecentAction(actionObj.action);
    setActionCount(prev => prev + 1);
    
    const reactions = getArthurReaction();
    setMessage(reactions[Math.floor(Math.random() * reactions.length)]);
    setShowActions(false);
    
    setTimeout(() => {
      setMessage('');
      setRecentAction('');
    }, 4000);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showActions && !event.target.closest('.honor-actions-container')) {
        setShowActions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showActions]);

  return (
    <div className="honor-system-corner">
      {/* Honor Display */}
      <div className="honor-display">
        <div className="honor-level">{getHonorLevel()}</div>
        <div className="honor-bar-container">
          <div className="honor-bar">
            <div 
              className={`honor-fill ${honor > 0 ? 'good' : honor < 0 ? 'bad' : 'neutral'}`}
              style={{ width: `${Math.abs(honor)}%` }}
            ></div>
          </div>
          <span className="honor-value">{honor}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="honor-actions-container">
        <button 
          className="honor-main-btn"
          onClick={() => setShowActions(!showActions)}
        >
          🤠 Actions ({actionCount})
        </button>

        {showActions && (
          <div className="actions-dropdown">
            <div className="actions-dropdown-content">
              <div className="actions-section good-actions">
                <h4>🌟 Good Deeds</h4>
                {HONOR_ACTIONS.good.map((action, i) => (
                  <button 
                    key={i}
                    className="action-btn good-btn"
                    onClick={() => performAction(action)}
                    title={action.description}
                  >
                    <span className="action-emoji">{action.emoji}</span>
                    <span className="action-text">{action.action}</span>
                    <span className="action-points">+{action.points}</span>
                  </button>
                ))}
              </div>

              <div className="actions-section bad-actions">
                <h4>😈 Mischief</h4>
                {HONOR_ACTIONS.bad.map((action, i) => (
                  <button 
                    key={i}
                    className="action-btn bad-btn"
                    onClick={() => performAction(action)}
                    title={action.description}
                  >
                    <span className="action-emoji">{action.emoji}</span>
                    <span className="action-text">{action.action}</span>
                    <span className="action-points">{action.points}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Scroll indicator for long lists */}
            <div className="scroll-indicator">↕️ Scroll for more</div>
          </div>
        )}
      </div>

      {/* Arthur's Reaction */}
      {message && (
        <div className={`arthur-message ${honor > 0 ? 'positive' : honor < 0 ? 'negative' : 'neutral'}`}>
          <div className="message-header">
            <span className="arthur-icon">🤠</span>
            <span>Arthur Morgan</span>
          </div>
          
        </div>
      )}
    </div>
  );
}
