const activeLoops = {};
const originalSizes = {}; // store original width of each utensil

// Save original sizes
document.querySelectorAll(".utensil").forEach((el) => {
  originalSizes[el.dataset.id] = el.offsetWidth; // store width in pixels
});

function playUtensil(id, el) {
  const pitchDisplay = document.getElementById("pitchDisplay");

  if (activeLoops[id]) {
    // Stop loop
    activeLoops[id].stop();
    delete activeLoops[id];
    el.classList.remove("shaking");
    el.style.transform = ""; // reset scale and shake
    console.log(`${id} stopped`);

    // Clear pitch text if no more active loops
    if (Object.keys(activeLoops).length === 0) {
      pitchDisplay.textContent = "";
    }
  } else {
    // Generate random pitch between -12 and +12 semitones
    const randomPitch = Math.floor(Math.random() * 25) - 12;

    const loop = new Tone.Loop((time) => {
      const player = utensilPlayers.player(id);
      player.playbackRate = Math.pow(2, randomPitch / 12);
      player.start(time);
    }, "1m").start(0);

    activeLoops[id] = loop;
    Tone.Transport.start();

    // Map pitch to scale (smaller for higher pitch, bigger for lower)
    const scaleFactor = 1 + randomPitch / 60; // around 0.8–1.2 range
    el.style.setProperty("--scale", scaleFactor);
    el.classList.add("shaking");

    // Show pitch info
    pitchDisplay.textContent = `🎵 ${id} pitch: ${
      randomPitch >= 0 ? "+" : ""
    }${randomPitch} semitones`;

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
    u.style.width = originalSizes[u.dataset.id] + "px"; // reset size
  });

  document.getElementById("pitchDisplay").textContent = "";

  clearEffects();
  console.log("All sounds stopped");
});
