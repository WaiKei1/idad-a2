const activeLoops = {}; // track active loops

function playUtensil(id) {
  if (activeLoops[id]) {
    // If already playing → stop it
    activeLoops[id].stop();
    delete activeLoops[id];
    console.log(`${id} stopped`);
  } else {
    // Random pitch between -12 and +12 semitones
    const randomPitch = Math.floor(Math.random() * 25) - 12;

    // Create a loop that plays every measure
    const loop = new Tone.Loop((time) => {
      utensilPlayers.player(id).playbackRate = Tone.IntervalToFrequencyRatio(
        randomPitch / 12
      );
      utensilPlayers.player(id).start(time);
    }, "1m").start(0);

    activeLoops[id] = loop;
    Tone.Transport.start();
    console.log(`${id} started with pitch ${randomPitch}`);
  }
}

// Attach event listeners to all utensils
document.querySelectorAll(".utensil").forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.dataset.id;
    playUtensil(id);
  });
});
