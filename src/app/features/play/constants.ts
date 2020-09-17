export const LEVEL_SCHEMA = [
  {
    active: false, // Starts/Stops the animations
    level: 1, // The level number/ID
    speed: { // Min/Max speed the moles will emerge/hide. We'll pick a random
    // number between these values
      min: 2.0,
      max: 4.0
    },
    delay: { // The mole's wait time before re-emerging from the hole again
      min: 0,
      max: 2
    },
    minScore: 1, // Score you need to progress to the next level
    time: 5 // Max time to complete the level
  }
];
