/* global saveEventAsLiked, saveEventAsDisliked, fetchData */
const cards = document.querySelectorAll(".event-card");
const numCards = JSON.parse(localStorage.getItem("events") || "[]").length;

let lastSwipe = null;

// Initialize when DOM is loaded and events are available
document.addEventListener("DOMContentLoaded", () => {
    // Wait a bit for events to be populated by app.js
    setTimeout(() => {
        createCardCounter();
        checkIfNoCardsLeft();
        initializeButtons();
    }, 100);
});

function initializeButtons() {
    const rejectBtn = document.getElementById("rejectBtn");
    const acceptBtn = document.getElementById("acceptBtn");
    const undoBtn = document.getElementById("undoBtn");

    if (rejectBtn) rejectBtn.addEventListener("click", swipeLeft);
    if (acceptBtn) acceptBtn.addEventListener("click", swipeRight);
    if (undoBtn) undoBtn.addEventListener("click", undoSwipe);
}

// Calculate remaining unswiped events
function calculateRemainingCards() {
    const events = fetchData("events");
    const likedEvents = fetchData("likedEvents");
    const dislikedEvents = fetchData("dislikedEvents");

    const likedEventIds = likedEvents.map((event) => event.id || event.name);
    const dislikedEventIds = dislikedEvents.map(
        (event) => event.id || event.name,
    );
    const swipedEventIds = [...likedEventIds, ...dislikedEventIds];

    return events.filter((event) => {
        const eventId = event.id || event.name;
        return !swipedEventIds.includes(eventId);
    }).length;
}
// Create the card counter sticker
function createCardCounter() {
    const cardContainer = document.querySelector(".card-container");
    if (!cardContainer) return;

    const counterSticker = document.createElement("div");
    counterSticker.id = "cardCounter";
    counterSticker.className = "card-counter-sticker";
    counterSticker.innerHTML = `<i class="fa-solid fa-layer-group"></i> <span id="counterText">${calculateRemainingCards()} events left</span>`;

    cardContainer.appendChild(counterSticker);
}

// Update the counter display
function updateCardCounter() {
    const counterText = document.getElementById("counterText");
    if (counterText) {
        counterText.textContent = `${calculateRemainingCards()} events left`;
    }
}

// return the currently displayed card
function getCurrentCard() {
    // First try to get a card that isn't hidden or animated
    let card = document.querySelector(
        ".event-card:not(.no-events):not(.no-more-events):not(.slide-out-left):not(.slide-out-right)",
    );

    // If no visible card, try to get any card that isn't a status message
    if (!card) {
        card = document.querySelector(
            ".event-card:not(.no-events):not(.no-more-events)",
        );
    }

    return card;
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
    if (!card) {
        console.log("No card found for swiping");
        return;
    }

    console.log("Swiping", direction, "for card:", card);

    // Get event data before swiping
    const eventData = getEventDataFromCard(card);
    console.log("Event data for swipe:", eventData);

    // Save user preference using global functions
    if (direction === "right" && eventData) {
        if (typeof window.saveEventAsLiked === "function") {
            window.saveEventAsLiked(eventData);
            console.log("Event saved as liked via window function");
        } else if (typeof saveEventAsLiked === "function") {
            saveEventAsLiked(eventData);
            console.log("Event saved as liked via global function");
        } else {
            console.error("saveEventAsLiked function not found");
        }
    } else if (direction === "left" && eventData) {
        if (typeof window.saveEventAsDisliked === "function") {
            window.saveEventAsDisliked(eventData);
            console.log("Event saved as disliked via window function");
        } else if (typeof saveEventAsDisliked === "function") {
            saveEventAsDisliked(eventData);
            console.log("Event saved as disliked via global function");
        } else {
            console.error("saveEventAsDisliked function not found");
        }
    }

    // add animation class depending on the swipe direction
    const animationClass =
        direction === "left" ? "slide-out-left" : "slide-out-right";
    card.classList.add(animationClass);
    console.log("Added animation class:", animationClass);

    // save the last swipe info for undo functionality
    lastSwipe = { card, direction, eventData };

    updateCardCounter();
    // Show next event after animation completes
    setTimeout(() => {
        // Use the app.js showNextEvent function if available
        if (typeof window.showNextEvent === "function") {
            window.showNextEvent();
            console.log("Called window.showNextEvent");
        } else if (typeof showNextEvent === "function") {
            showNextEvent();
            console.log("Called global showNextEvent");
        } else {
            console.error("showNextEvent function not found");
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

    // Restore the card to its original position
    const cardContainer = document.querySelector(".card-container");
    if (cardContainer) {
        // Remove any existing card that might be showing
        const existingCard = cardContainer.querySelector(".event-card");
        if (existingCard && existingCard !== card) {
            existingCard.remove();
        }

        // Insert the undone card back at the beginning
        const swipeButtons = cardContainer.querySelector(".swipe-buttons");
        if (swipeButtons) {
            cardContainer.insertBefore(card, swipeButtons);
        } else {
            cardContainer.appendChild(card);
        }

        // Reset card styles
        card.style.opacity = "1";
        card.style.transform = "none";
        card.style.transition = "opacity 0.3s ease-in-out";
    }

    // Decrement the current event index if it exists
    if (
        typeof window.currentEventIndex !== "undefined" &&
        window.currentEventIndex > 0
    ) {
        window.currentEventIndex--;
    }

    updateCardCounter();
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
