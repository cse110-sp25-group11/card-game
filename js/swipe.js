const cards = document.querySelectorAll(".event-card");
const rejectBtn = document.getElementById("rejectBtn");
const acceptBtn = document.getElementById("acceptBtn");
const undoBtn = document.getElementById("undoBtn");

let currentCardIndex = 0;
let lastSwipe = null;

function getCurrentCard() {
  return cards[currentCardIndex];
}

function swipe(direction) {
  const card = getCurrentCard();
  if (!card) return;

  const animationClass =
    direction === "left" ? "slide-out-left" : "slide-out-right";
  card.classList.add(animationClass);

  lastSwipe = { card, direction };

  currentCardIndex++;
  showUndo();
  checkIfNoCardsLeft();
}

function swipeLeft() {
  swipe("left");
}

function swipeRight() {
  swipe("right");
}

function undoSwipe() {
  if (!lastSwipe) return;

  const { card } = lastSwipe;
  card.classList.remove("slide-out-left", "slide-out-right");

  currentCardIndex--;
  lastSwipe = null;
  undoBtn.style.display = "none";
  updateButtons(true);
}

function showUndo() {
  undoBtn.style.display = "block";
}

function checkIfNoCardsLeft() {
  if (currentCardIndex >= cards.length) {
    updateButtons(false);
  }
}

function updateButtons(enable) {
  acceptBtn.disabled = !enable;
  rejectBtn.disabled = !enable;
  if (!enable) {
    acceptBtn.style.opacity = 0.5;
    rejectBtn.style.opacity = 0.5;
  } else {
    acceptBtn.style.opacity = 1;
    rejectBtn.style.opacity = 1;
  }
}

// Initial check in case there's no card at all
checkIfNoCardsLeft();

rejectBtn.addEventListener("click", swipeLeft);
acceptBtn.addEventListener("click", swipeRight);
undoBtn.addEventListener("click", undoSwipe);
