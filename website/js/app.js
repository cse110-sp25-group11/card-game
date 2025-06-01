/**
 * @fileoverview Main application logic for Campus Swipe
 * @requires storage.js - fetchData function
 */

/* global fetchData */

/**
 * updates the specific data in localStorage given the key.
 * If it doesn't exist, it will create it
 * @param {string} key the key of the data
 * @param {Object} newData the new details for an event
 * @returns {void}
 */
function updateLocalStorage(key, newData) {
    // returns of a key or data was not passed in
    if (!key) return;
    if (!newData || typeof newData !== "object") return;

    // check whether all values inside newData are valid
    if (!checkValidEvent(newData)) return;

    // grab the current data for the key
    // the data will be an array of stringified JSON formmatted Object
    let currentData = JSON.parse(localStorage.getItem(key));

    // if it existing data not found, upload the newData right away
    if (!currentData) {
        localStorage.setItem(key, JSON.stringify([newData]));
        console.log("No data found. Uploading current data as first values.");
        return;
    }
    let eventFound = false;
    for (let event of currentData) {
        // if event is found, change details to newData
        if (event.name == newData.name) {
            eventFound = true;
            event = newData;
            console.log("Event details successfully changed");
        }
    }
    // if event not found, add it to our data
    if (!eventFound) {
        currentData.push(newData);
        console.log("Event not found. Successfully added event.");
    }
    // update our localStorage with modified event
    localStorage.setItem(key, JSON.stringify(currentData));
}

/**
 * Checks if all the entries for our event are valid
 * @param {Object} event the event we want to check
 * @returns {boolean} whether it is valid or not
 */
function checkValidEvent(event) {
    if (typeof event !== "object" || event === null) return false;

    const requiredFields = {
        name: "string",
        description: "string",
        date: "string",
        org: "string",
        imgLink: "string",
        imgAltText: "string",
        location: "string",
        food: "boolean",
        startTime: "string",
        endTime: "string",
    };

    for (let key in requiredFields) {
        if (!(key in event) || typeof event[key] !== requiredFields[key]) {
            return false;
        }
    }

    return true;
}

const navButtons = document.querySelectorAll("nav button");
if (navButtons.length >= 5) {
    navButtons[0].onclick = () => {
        window.location.href = "index.html";
    };
    navButtons[1].onclick = () => {
        window.location.href = "post.html";
    };
    navButtons[2].onclick = () => {
        window.location.href = "browse.html";
    };
    navButtons[3].onclick = () => {
        window.location.href = "liked.html";
    };
    navButtons[4].onclick = () => {
        window.location.href = "index.html";
    };
}

/**
 * Loads and displays events in the browse page carousels
 * Categorizes events into: Happening Now, Upcoming Events, and Popular Events
 */
function loadEventsForBrowse() {
    if (!document.querySelector(".event-carousel")) return;

    const events = fetchData("events");

    if (events.length === 0) {
        console.log("No events found in localStorage");
        return;
    }

    const carousels = document.querySelectorAll(".event-carousel .event-cards");

    if (carousels.length < 3) {
        console.error("Expected 3 carousels but found", carousels.length);
        return;
    }

    carousels.forEach((carousel) => {
        carousel.innerHTML = "";
    });

    const currentlyHappening = getCurrentlyHappeningEvents(events);
    const upcomingEvents = getUpcomingEvents(events);
    const pastEvents = getPastEvents(events);

    populateCarousel(carousels[0], currentlyHappening);
    populateCarousel(carousels[1], upcomingEvents);
    populateCarousel(carousels[2], pastEvents);
}

/**
 * Gets events that are happening today
 * @param {Array} events - Array of event objects
 * @returns {Array} - Events happening today
 */
function getCurrentlyHappeningEvents(events) {
    const today = new Date();
    const todayString = `${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}/${today.getFullYear()}`;

    return events.filter((event) => {
        return event.date === todayString;
    });
}

/**
 * Gets events that are scheduled for future dates
 * @param {Array} events - Array of event objects
 * @returns {Array} - Future events sorted by date
 */
function getUpcomingEvents(events) {
    const today = new Date();

    return events
        .filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate > today;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Gets events that have already occurred
 * @param {Array} events - Array of event objects
 * @returns {Array} - Past events sorted by date
 */
function getPastEvents(events) {
    const today = new Date();

    return events
        .filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate < today;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Populates a carousel with event cards
 * @param {HTMLElement} carousel - The carousel container element
 * @param {Array} events - Array of event objects to display
 */
function populateCarousel(carousel, events) {
    if (events.length === 0) {
        // Show a message when no events are available
        const noEventsMessage = document.createElement("div");
        noEventsMessage.className = "no-events-message";
        noEventsMessage.innerHTML = "<p>No events available</p>";
        carousel.appendChild(noEventsMessage);
        return;
    }

    events.forEach((event) => {
        const eventCard = createEventCardElement(event);
        carousel.appendChild(eventCard);
    });
}

/**
 * Creates an event card element from event data
 * @param {Object} event - Event object from localStorage
 * @returns {HTMLElement} - Event card article element
 */
function createEventCardElement(event) {
    const article = document.createElement("article");
    article.className = "event-card";

    // Map the stored event data to the format expected by the HTML structure
    const eventData = mapEventData(event);

    // TODO: Make browse cards dynamically update when event data changes per Mia's request
    article.innerHTML = `
    <div class="photo-container">
      <img src="${eventData.imgLink}" alt="${eventData.imgAltText}" />
    </div>
    <div class="event-info">
      <h3>${eventData.name}</h3>
      <h3>${eventData.org}</h3>
    </div>
  `;

    return article;
}

/**
 * Maps stored event data to the format expected by the display components
 * Handles both form submission format and debug populate format
 * @param {Object} event - Event object from localStorage
 * @returns {Object} - Mapped event data
 */
function mapEventData(event) {
    // Handle both data structures: form submission (eventName, orgName) and debug populate (name, org)
    const name = event.eventName || event.name || "Untitled Event";
    const org = event.orgName || event.org || "Unknown Organization";
    
    // Create fallback image URL using placehold.co with event name
    const fallbackImageUrl = `https://placehold.co/300x200?text=${encodeURIComponent(name.replace(/\s+/g, '+'))}`;
    
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

document.addEventListener("DOMContentLoaded", loadEventsForBrowse);
