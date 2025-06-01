/**
 * @fileoveriew Load home cards dynamically instead of hardcoding them in HTML.
 */

/**
 * Global variable to keep track of the current index of the event card being displayed.
 */
let currentIndex = 0;

/**
 * Lets the linter and static analysis tools know that these functions are defined elsewhere.
/* global swipeRight, swipeLeft */

/**
 * HTML elements for accept and reject buttons.
 */
const acceptBtn = document.getElementById("acceptBtn");
const rejectBtn = document.getElementById("rejectBtn");

/**
 * Retrieves events from localStorage
 * @returns JSON array of events
 */
function getEvents() {
    return JSON.parse(localStorage.getItem("events") || "[]");
}

/**
 * Appends and displays an event card in the card container.
 * @param {object} event  - event to be appended to container to display
 */
function appendEventCard(event) {
    const cardContainer = document.querySelector(".card-container");
    if (!cardContainer) return;

    const eventCard = document.createElement("home-event-card");
    eventCard.data = event;
    cardContainer.appendChild(eventCard);
}

/**
 * Clears the card container by removing all child elements.
 * This is useful for resetting the display before loading new events.
 */
function clearCardContainer() {
    const cardContainer = document.querySelector(".card-container");
    if (cardContainer) {
        cardContainer.innerHTML = "";
    }
}

/**
 * Navigates to the next event card in the array of events.
 * @param {Array} events - The array of events to navigate through
 */
function nextCard(events) {
    currentIndex++;
    if (currentIndex < events.length) {
        clearCardContainer();
        appendEventCard(events[currentIndex]);
    } else {
        console.warn("No more events to display.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.querySelector(".card-container");
    if (!cardContainer) return;

    // Get events from localStorage
    const events = getEvents();

    // Clear previously loaded cards
    clearCardContainer();

    // Append first event card if available
    if (events.length > 0 && events[currentIndex]) {
        appendEventCard(events[currentIndex]);
    }

    acceptBtn.addEventListener("click", () => {
        swipeRight();
        setTimeout(() => {
            nextCard(events);
        }, 500);
    });
    rejectBtn.addEventListener("click", () => {
        swipeLeft();
        setTimeout(() => {
            nextCard(events);
        }, 500);
    });
});
