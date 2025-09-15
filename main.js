const utensils = document.querySelectorAll(".utensil");
const composition = document.getElementById("composition");

const loops = {}; // store Tone.Players per utensil

// helper to get random pitch factor
function getRandomPitch() {
  const pitches = [0.75, 1, 1.25, 1.5]; // low, medium, high, extra-high
  return pitches[Math.floor(Math.random() * pitches.length)];
}

utensils.forEach((utensil) => {
  utensil.addEventListener("click", () => {
    const id = utensil.dataset.id;

    if (loops[id]?.state === "started") {
      // stop current loop
      loops[id].stop();
      loops[id].state = "stopped";
    } else {
      // create new loop with random pitch
      const player = new Tone.Player(`sounds/${id}.mp3`).toDestination();
      player.playbackRate = getRandomPitch();
      player.loop = true;
      player.start();
      player.state = "started";
      loops[id] = player;
    }
  });

  // Make utensils draggable
  utensil.setAttribute("draggable", true);
  utensil.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", utensil.dataset.id);
  });
});

// Allow dragging into composition
composition.addEventListener("dragover", (e) => e.preventDefault());
composition.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const clone = document
    .querySelector(`.utensil[data-id="${id}"]`)
    .cloneNode(true);
  composition.appendChild(clone);
});
