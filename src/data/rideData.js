// src/data/rideData.js
export const challenges = [
  { id: 1, text: "Pet every dog in Valentine. In one playthrough.", honor: 20 },
  { id: 2, text: "Collect all the dinosaur bones. Again.", honor: 40 },
  { id: 3, text: "Survive a fall off the Heartlands cliff. On purpose.", honor: 15 },
  { id: 4, text: "Help the Downes family. Every time.", honor: 25 },
  { id: 5, text: "Catch the Legendary Fish. Without a guide.", honor: 30 },
];

export const questions = [
  {
    id: 1,
    question: "What is Gavin's friend's name? (Yes, really.)",
    options: ["Nigel", "Thomas", "Gavin Jr.", "Nobody knows"],
    answer: 0,
    lore: "Nigel is still looking for his friend Gavin, even after four playthroughs."
  },
  {
    id: 2,
    question: "Which gang member is secretly a rat?",
    options: ["John", "Micah", "Dutch", "Hosea"],
    answer: 1,
    lore: "Micah Bell, the traitor."
  },
  {
    id: 3,
    question: "Where is the vampire in Saint Denis?",
    options: ["Cathedral", "Alley", "Butcher", "Train Station"],
    answer: 1,
    lore: "He writes a letter in blood in the alley."
  },
  {
    id: 4,
    question: "What is the ‘best’ ending for Arthur?",
    options: ["Honorable, help John", "Low Honor, help John", "Honorable, go for money", "Low Honor, go for money"],
    answer: 0,
    lore: "Helping John with high honor is the truest finish."
  },
];

export const polls = [
  {
    id: 1,
    question: "Did you help Mary Linton?",
    options: ["Yes, every time", "Sometimes", "No, never", "Only on low honor"],
    lore: "Mary’s letters are a rare glimpse of Arthur’s heart."
  },
  {
    id: 2,
    question: "Did you rob the train with the gang?",
    options: ["Yes, every time", "Sometimes", "No, never", "Only for Micah"],
    lore: "The train heist is a turning point for the gang."
  },
  {
    id: 3,
    question: "Did you give money to the Downes family?",
    options: ["Yes, always", "Sometimes", "No", "Only after I knew the truth"],
    lore: "Helping the Downeses is one of Arthur’s most human moments."
  },
];

export const badges = [
  { id: 1, name: "Four-Time Legend", lore: "You’ve ridden through the game four times. That’s commitment, partner.", unlocked: true },
  { id: 2, name: "Gavin Finder", lore: "You know where Gavin is. (Nobody else does.)", unlocked: false },
  { id: 3, name: "Lumbago Survivor", lore: "You’ve heard Uncle complain about his lumbago more than most.", unlocked: false },
  { id: 4, name: "Eagle Eye", lore: "You’ve spotted the Loft’s secrets on every playthrough.", unlocked: false },
  { id: 5, name: "Dutch’s Ultimate Plan", lore: "You still believe in the plan. (No, really. Four times.)", unlocked: true },
];
