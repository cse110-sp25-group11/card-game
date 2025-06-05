/* global saveEventAsLiked, saveEventAsDisliked, fetchData */
const cards = document.querySelectorAll(".event-card");
const numCards = JSON.parse(localStorage.getItem("events") || "[]").length;

let lastSwipe = null;

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    checkIfNoCardsLeft();
    initializeButtons();
});

function initializeButtons() {
    const rejectBtn = document.getElementById("rejectBtn");
    const acceptBtn = document.getElementById("acceptBtn");
    const undoBtn = document.getElementById("undoBtn");

    if (rejectBtn) rejectBtn.addEventListener("click", swipeLeft);
    if (acceptBtn) acceptBtn.addEventListener("click", swipeRight);
    if (undoBtn) undoBtn.addEventListener("click", undoSwipe);
}

// return the currently displayed card
function getCurrentCard() {
    return document.querySelector(
        ".event-card:not(.no-events):not(.no-more-events)",
    );
}

// Get event data from the current card
function getEventDataFromCard(card) {
    if (!card) return null;

    const eventId = card.dataset.eventId;
    if (!eventId) return null;

    const events = fetchData("events");
    return events.find((event) => (event.id || event.name) === eventId);
}

// handle swiping left or right
function swipe(direction) {
    const card = getCurrentCard();
    if (!card) return;

    // Get event data before swiping
    const eventData = getEventDataFromCard(card);

    // Save user preference
    if (direction === "right" && eventData) {
        saveEventAsLiked(eventData);
    } else if (direction === "left" && eventData) {
        saveEventAsDisliked(eventData);
    }

    // add animation class depending on the swipe direction
    const animationClass =
        direction === "left" ? "slide-out-left" : "slide-out-right";
    card.classList.add(animationClass);

    // save the last swipe info for undo functionality
    lastSwipe = { card, direction, eventData };

    // Show next event after animation completes
    setTimeout(() => {
        // Use the app.js showNextEvent function if available
        if (typeof showNextEvent === "function") {
            showNextEvent();
        }
        checkIfNoCardsLeft();
    }, 200);

    showUndo();
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

    const { card, direction, eventData } = lastSwipe;

    // Remove the preference from localStorage
    if (direction === "right" && eventData) {
        removeEventFromLiked(eventData);
    } else if (direction === "left" && eventData) {
        removeEventFromDisliked(eventData);
    }

    // remove the swiping animation
    card.classList.remove("slide-out-left", "slide-out-right");

    // Insert the undone card back
    const cardContainer = document.querySelector(".card-container");
    if (cardContainer) {
        const existingCard = cardContainer.querySelector(".event-card");
        if (existingCard) {
            existingCard.remove();
        }
        cardContainer.insertBefore(
            card,
            cardContainer.querySelector(".swipe-buttons"),
        );
    }

    lastSwipe = null;
    // hides the undo button and shows the check mark and cross buttons
    const undoBtn = document.getElementById("undoBtn");
    if (undoBtn) {
        undoBtn.style.display = "none";
    }
    updateButtons(true);
}

/**
 * Removes an event from the liked events list
 * @param {Object} event - Event object to remove
 */
function removeEventFromLiked(event) {
    if (!event) return;

    let likedEvents = fetchData("likedEvents");
    const eventId = event.id || event.name;

    likedEvents = likedEvents.filter(
        (liked) => (liked.id || liked.name) !== eventId,
    );

    localStorage.setItem("likedEvents", JSON.stringify(likedEvents));
    console.log("Event removed from liked:", event.name || event.eventName);
}

/**
 * Removes an event from the disliked events list
 * @param {Object} event - Event object to remove
 */
function removeEventFromDisliked(event) {
    if (!event) return;

    let dislikedEvents = fetchData("dislikedEvents");
    const eventId = event.id || event.name;

    dislikedEvents = dislikedEvents.filter(
        (disliked) => (disliked.id || disliked.name) !== eventId,
    );

    localStorage.setItem("dislikedEvents", JSON.stringify(dislikedEvents));
    console.log("Event removed from disliked:", event.name || event.eventName);
}

//ends up showing the undo button
function showUndo() {
    const undoBtn = document.getElementById("undoBtn");
    if (undoBtn) {
        undoBtn.style.display = "block";
    }
}

//checks if there are no cards left to swipe
function checkIfNoCardsLeft() {
    const currentCard = getCurrentCard();
    const hasCard =
        currentCard &&
        !currentCard.classList.contains("no-events") &&
        !currentCard.classList.contains("no-more-events");
    updateButtons(hasCard);
}

// updates the state of the accept and reject buttons based on 'enable'
function updateButtons(enable) {
    const acceptBtn = document.getElementById("acceptBtn");
    const rejectBtn = document.getElementById("rejectBtn");

    if (acceptBtn && rejectBtn) {
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
}

// Initial check in case there's no card at all
checkIfNoCardsLeft();
