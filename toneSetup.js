// toneSetup.js

// Called when the modal closes
function toneInit() {
  Tone.start().then(() => {
    console.log("Tone.js started");
  });
}

// Create a Tone.Players instance
const utensilPlayers = new Tone.Players(
  {
    teapot: "sounds/teapot.wav",
    teaCup: "sounds/teaCup.wav",
    salt: "sounds/salt.wav",
    pepper: "sounds/pepper.wav",
    vinegar: "sounds/vinegar.wav",
    panLid: "sounds/panLid.wav",
    bowl: "sounds/bowl.wav",
    glass: "sounds/glass.wav",
    spoon: "sounds/spoon.wav",
    chopsticks: "sounds/chopsticks.wav",
    cuttingBoard: "sounds/cuttingBoard.wav",
    knife: "sounds/knife.wav",
    pan: "sounds/pan.wav",
  },
  {
    volume: -6,
    fadeOut: "64n",
  }
).toDestination();
