document.addEventListener(
  "click",
  async () => {
    await Tone.start();
    console.log("Tone.js is ready");
  },
  { once: true }
);

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
  },
  {
    volume: -6,
    fadeOut: "64n",
  }
).toDestination();
