/**
 * @fileoverview Liked Events Page Logic
 * @requires storage.js - fetchData function
 * @requires app.js - mapEventData function
 */

/* global fetchData, mapEventData */

/**
 * Maps stored event data to the format expected by the display components
 * Handles both form submission format and debug populate format
 * @param {Object} event - Event object from localStorage
 * @returns {Object} - Mapped event data
 */
function mapEventDataLocal(event) {
    // Handle both data structures: form submission (eventName, orgName) and debug populate (name, org)
    const name = event.eventName || event.name || "Untitled Event";
    const org = event.orgName || event.org || "Unknown Organization";

    // Create fallback image URL using placehold.co with event name
    const fallbackImageUrl = `https://placehold.co/300x200?text=${encodeURIComponent(name.replace(/\s+/g, "+"))}`;

    const imgLink = event.photoFileName
        ? `uploads/${event.photoFileName}`
        : event.imgLink || fallbackImageUrl;
    const imgAltText = event.altText || event.imgAltText || `${name} photo`;

    return {
        name: name,
        org: org,
        date: event.date || "",
        imgLink: imgLink,
        imgAltText: imgAltText,
        location: event.location || "Location TBD",
        food: event.food === "yes" || event.food === true,
        startTime: event.startTime || "00:00",
        endTime: event.endTime || "23:59",
        description: event.description || "No description available",
    };
}

/**
 * Loads and displays liked events from localStorage.
 * Updates the grid and no-events message accordingly.
 * @return {void}
 */
function loadLikedEvents() {
    const likedEventsGrid = document.querySelector(".liked-events-grid");
    const noEventsMessage = document.querySelector(".no-events-message");

    if (!likedEventsGrid) return;

    const likedEvents = fetchData("likedEvents");

    likedEventsGrid.innerHTML = "";

    if (likedEvents.length === 0) {
        likedEventsGrid.style.display = "none";
        if (noEventsMessage) {
            noEventsMessage.hidden = false;
        }
        return;
    }

    likedEventsGrid.style.display = "grid";
    if (noEventsMessage) {
        noEventsMessage.hidden = true;
    }

    const sortedEvents = likedEvents.sort((a, b) => {
        const dateA = new Date(a.likedAt || 0);
        const dateB = new Date(b.likedAt || 0);
        return dateB - dateA;
    });

    sortedEvents.forEach((event) => {
        const eventCard = createLikedEventCard(event);
        likedEventsGrid.appendChild(eventCard);
    });
}

/**
 * Creates a card element for a liked event
 * @param {Object} event - Event data from localStorage
 * @returns {HTMLElement} - Event card element
 */
function createLikedEventCard(event) {
    const article = document.createElement("article");
    article.className = "event-card";
    article.dataset.eventId = event.id || event.name;

    // Use global mapEventData if available, otherwise use local function
    const eventData =
        typeof window.mapEventData === "function"
            ? window.mapEventData(event)
            : mapEventDataLocal(event);

    const duration = calculateEventDuration(
        eventData.startTime,
        eventData.endTime,
    );

    const displayDate = formatDateForDisplay(eventData.date);

    article.innerHTML = `
        <div class="photo-container">
            <img src="${eventData.imgLink}" alt="${eventData.imgAltText}" />
        </div>
        <div class="event-info">
            <h3>${eventData.name}</h3>
            <p class="org-name">${eventData.org}</p>
            <p class="event-date">
                Date: <time datetime="${eventData.date}">${displayDate}</time>
            </p>
            <p class="event-time">
                Time: ${eventData.startTime} - ${eventData.endTime}
            </p>
            <p class="event-duration">Duration: ${duration}</p>
            <p class="event-location">Location: ${eventData.location}</p>
            <p class="event-description">${eventData.description}</p>
            <p class="food-info">Food: ${eventData.food ? "Yes" : "No"}</p>
            <button class="unlike-button" onclick="unlikeEvent('${(event.id || event.name).replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-heart-crack"></i> Unlike
            </button>
        </div>
    `;

    return article;
}

/**
 * Calculates the duration between start and end times
 * @param {string} startTime - Start time in HH:MM format
 * @param {string} endTime - End time in HH:MM format
 * @returns {string} - Duration description
 */
function calculateEventDuration(startTime, endTime) {
    if (!startTime || !endTime) return "Duration unknown";

    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    let durationMinutes = endMinutes - startMinutes;

    if (durationMinutes < 0) {
        durationMinutes += 24 * 60;
    }

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours === 0) {
        return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else if (minutes === 0) {
        return `${hours} hour${hours !== 1 ? "s" : ""}`;
    } else {
        return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }
}

/**
 * Formats a date string for display
 * @param {string} dateString - Date in MM/DD/YYYY format
 * @returns {string} - Formatted date for display
 */
function formatDateForDisplay(dateString) {
    if (!dateString) return "Date unknown";

    try {
        const [month, day, year] = dateString.split("/");
        const date = new Date(year, month - 1, day);

        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch (error) {
        return dateString;
    }
}

/**
 * Removes an event from the liked events list.
 * @param {string} eventId The ID or name of the event to unlike
 * @return {void}
 */
function unlikeEvent(eventId) {
    if (!eventId) return;

    let likedEvents = fetchData("likedEvents");

    likedEvents = likedEvents.filter(
        (event) => (event.id || event.name) !== eventId,
    );

    localStorage.setItem("likedEvents", JSON.stringify(likedEvents));

    loadLikedEvents();

    console.log("Event unliked:", eventId);
}

/**
 * Sets up the browse events button functionality.
 * Adds a click listener to redirect to the browse page.
 * @return {void}
 */
function setupBrowseButton() {
    const browseButton = document.querySelector(".no-events-message button");
    if (browseButton) {
        browseButton.addEventListener("click", () => {
            window.location.href = "browse.html";
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadLikedEvents();
    setupBrowseButton();
});

window.unlikeEvent = unlikeEvent;
