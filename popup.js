window.addEventListener("load", () => {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popupMessage");
  const closePopup = document.getElementById("closePopup");
  const mainContent = document.querySelector(".main-content");
  const introDialog = document.getElementById("introDialog");

  if (window.innerWidth < 1000) {
    popupMessage.textContent =
      "⚠️ Please use a larger screen for best experience!";
    popup.style.display = "flex";

    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
      mainContent.style.display = "block";
    });
  } else {
    mainContent.style.display = "block";
    introDialog.showModal();
  }
});

const introModal = document.getElementById("introDialog");

document.getElementById("dialogCloseButton").addEventListener("click", () => {
  introModal.close();
});

introModal.addEventListener("close", toneInit);
