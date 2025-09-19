const activeLoops = {};

function playUtensil(id, el) {
  if (activeLoops[id]) {
    // Stop existing loop
    activeLoops[id].stop();
    delete activeLoops[id];
    el.classList.remove("shaking"); // stop shaking animation
    console.log(`${id} stopped`);
  } else {
    // Random pitch between -12 and +12 semitones
    const randomPitch = Math.floor(Math.random() * 25) - 12;

    // Create a loop to play the utensil sound repeatedly
    const loop = new Tone.Loop((time) => {
      const player = utensilPlayers.player(id);
      player.playbackRate = Math.pow(2, randomPitch / 12);
      player.start(time);
    }, "1m").start(0);

    activeLoops[id] = loop;
    Tone.Transport.start();

    el.classList.add("shaking"); // start shaking animation
    console.log(`${id} started with pitch ${randomPitch}`);
  }
}

// Attach click listeners
document.querySelectorAll(".utensil").forEach((el) => {
  el.addEventListener("click", async () => {
    await Tone.start(); // ensure audio context is ready
    const id = el.dataset.id;
    playUtensil(id, el);
  });
});

// Reset button stops everything
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  for (let id in activeLoops) {
    activeLoops[id].stop();
    delete activeLoops[id];
  }

  document.querySelectorAll(".utensil").forEach((u) => {
    u.classList.remove("shaking");
  });

  clearEffects();
  console.log("All sounds stopped");
});
