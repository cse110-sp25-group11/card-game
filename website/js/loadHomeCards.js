/* global swipeRight, swipeLeft */

/**
 * @fileoveriew Load home cards dynamically instead of hardcoding them in HTML.
 * NOTE: This file is currently disabled in favor of the app.js loading system
 * to prevent duplicate card loading.
 */

// Disabled to prevent conflicts with app.js
// The event loading is now handled by app.js loadEventsForSwipe()

/*
let currentIndex = 0;

function getEvents() {
    return JSON.parse(localStorage.getItem("events") || "[]");
}

function appendEventCard(event) {
    const cardContainer = document.querySelector(".card-container");
    if (!cardContainer) return;

    const eventCard = document.createElement("home-event-card");
    eventCard.data = event;
    cardContainer.appendChild(eventCard);
}

function clearCardContainer() {
    const cardContainer = document.querySelector(".card-container");
    if (cardContainer) {
        cardContainer.innerHTML = "";
    }
}

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

    const events = getEvents();

    clearCardContainer();

    if (events.length > 0 && events[currentIndex]) {
        appendEventCard(events[currentIndex]);
    }
});
*/
