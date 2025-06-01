const cards = document.querySelectorAll(".event-card");
const numCards = JSON.parse(localStorage.getItem("all-events") || "[]").length;

let currentCardIndex = 0;
let lastSwipe = null;

// return the currently displayed card
function getCurrentCard() {
    return cards[currentCardIndex];
}

// handle swiping left or right
function swipe(direction) {
    const card = document.querySelector("home-event-card");
    if (!card) return;

    // add animation class depending on the swipe direction
    const animationClass =
        direction === "left" ? "slide-out-left" : "slide-out-right";
    card.classList.add(animationClass);

    // save the last swipe info for undo functionality
    lastSwipe = { card, direction };

    // move to the next card
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

// undoing the last swipe action
function undoSwipe() {
    if (!lastSwipe) return;

    const { card } = lastSwipe;
    // remove the swiping animation
    card.classList.remove("slide-out-left", "slide-out-right");

    currentCardIndex--;
    // goes back to the last card
    lastSwipe = null;
    // hides the undo button and shows the check mark and cross buttons
    undoBtn.style.display = "none";
    updateButtons(true);
}

//ends up showing the undo button
function showUndo() {
    undoBtn.style.display = "block";
}

//checks if there are no cards left to swipe
function checkIfNoCardsLeft() {
    console.log(
        `Current card index: ${currentCardIndex}, Total cards: ${numCards}`,
    );
    if (currentCardIndex >= numCards) {
        console.log("No more cards left to swipe.");
        updateButtons(false);
    }
}

// updates the state of the accept and reject buttons based on 'enable'
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

// rejectBtn.addEventListener("click", swipeLeft);
// acceptBtn.addEventListener("click", swipeRight);
// undoBtn.addEventListener("click", undoSwipe);
