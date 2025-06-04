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

    // Check if this event is liked
    const likedEvents = fetchData("likedEvents");
    const eventId = event.id || event.name;
    const isLiked = likedEvents.some(
        (liked) => (liked.id || liked.name) === eventId,
    );

    // TODO: Make browse cards dynamically update when event data changes per Mia's request
    article.innerHTML = `
    <div class="photo-container">
      <img src="${eventData.imgLink}" alt="${eventData.imgAltText}" />
      ${isLiked ? '<div class="liked-indicator"><i class="fa-solid fa-heart"></i></div>' : ""}
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

document.addEventListener("DOMContentLoaded", () => {
    // Add sample events if none exist
    const events = fetchData("events");
    if (events.length === 0) {
        populateSampleEvents();
    }
    
    loadEventsForBrowse();
    // Only load events for swipe if we're on the main page
    if (document.querySelector('.swipe-page')) {
        loadEventsForSwipe();
    }
});

/**
 * Populates localStorage with a few sample events if none exist
 */
function populateSampleEvents() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    function formatDate(date) {
        return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`;
    }
    
    const sampleEvents = [
        {
            name: "Tech Workshop",
            description: "Learn the latest in web development and coding techniques. Perfect for beginners and advanced developers alike.",
            date: formatDate(today),
            org: "Computer Science Club",
            imgLink: "https://via.placeholder.com/400x300/0066cc/ffffff?text=Tech+Workshop",
            imgAltText: "Tech Workshop promotional image",
            location: "Science Building Room 101",
            food: true,
            startTime: "14:00",
            endTime: "16:00"
        },
        {
            name: "Art Exhibition",
            description: "Showcase of student artwork featuring paintings, sculptures, and digital art from talented campus artists.",
            date: formatDate(tomorrow),
            org: "Art Club",
            imgLink: "https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Art+Exhibition",
            imgAltText: "Art Exhibition promotional image",
            location: "Art Studio",
            food: false,
            startTime: "18:00",
            endTime: "20:00"
        },
        {
            name: "Study Group Session",
            description: "Collaborative study session for upcoming midterm exams. Bring your textbooks and notes!",
            date: formatDate(today),
            org: "Student Government",
            imgLink: "https://via.placeholder.com/400x300/4ecdc4/ffffff?text=Study+Session",
            imgAltText: "Study Group promotional image",
            location: "Library Auditorium",
            food: true,
            startTime: "19:00",
            endTime: "21:00"
        }
    ];
    
    localStorage.setItem("events", JSON.stringify(sampleEvents));
    console.log("Sample events populated:", sampleEvents.length);
}

/**
 * Loads events from localStorage for the main swipe page
 * Populates the card container with events that haven't been swiped yet
 */
function loadEventsForSwipe() {
    const cardContainer = document.querySelector(".card-container");
    if (!cardContainer) return;

    const events = fetchData("events");

    if (events.length === 0) {
        console.log("No events found in localStorage");
        showNoEventsMessage();
        return;
    }

    window.allEvents = events;
    window.currentEventIndex = 0;

    showNextEvent();
}

/**
 * Gets the next unswiped event
 * @returns {Object|null} - Next event to display or null if no more events
 */
function getNextUnswipedEvent() {
    if (!window.allEvents) return null;

    const likedEvents = fetchData("likedEvents");
    const dislikedEvents = fetchData("dislikedEvents");

    const likedEventIds = likedEvents.map((event) => event.id || event.name);
    const dislikedEventIds = dislikedEvents.map(
        (event) => event.id || event.name,
    );
    const swipedEventIds = [...likedEventIds, ...dislikedEventIds];

    for (let i = window.currentEventIndex; i < window.allEvents.length; i++) {
        const event = window.allEvents[i];
        const eventId = event.id || event.name;

        if (!swipedEventIds.includes(eventId)) {
            window.currentEventIndex = i;
            return event;
        }
    }

    return null;
}

/**
 * Shows the next available event card
 */
function showNextEvent() {
    const cardContainer = document.querySelector(".card-container");
    if (!cardContainer) return;

    const nextEvent = getNextUnswipedEvent();

    if (!nextEvent) {
        showNoMoreEventsMessage();
        return;
    }

    const existingCard = cardContainer.querySelector(".event-card");
    if (existingCard) {
        existingCard.remove();
    }

    const eventCard = createSwipeEventCard(nextEvent);

    eventCard.style.opacity = "0";
    eventCard.style.transition = "opacity 0.3s ease-in-out";

    cardContainer.insertBefore(
        eventCard,
        cardContainer.querySelector(".swipe-buttons"),
    );

    setTimeout(() => {
        eventCard.style.opacity = "1";
    }, 50);

    window.currentEventIndex++;
}

/**
 * Creates an event card for the swipe interface
 * @param {Object} event - Event data from localStorage
 * @returns {HTMLElement} - Event card element
 */
function createSwipeEventCard(event) {
    const article = document.createElement("article");
    article.className = "event-card";

    article.dataset.eventId = event.id || event.name;

    const eventData = mapEventData(event);

    article.innerHTML = `
        <div class="event-image">
            <img src="${eventData.imgLink}" alt="${eventData.imgAltText}" />
        </div>
        <div class="event-details">
            <div class="event-header">
                <h2>${eventData.name}</h2>
                <span>${eventData.org}</span>
            </div>
            <div class="event-date">
                <span>${eventData.date} | ${eventData.startTime} - ${eventData.endTime}</span>
            </div>
            <div class="event-description">
                <p>${eventData.description}</p>
            </div>
            <div class="event-location">
                <p><i class="fa-solid fa-location-dot"></i> ${eventData.location}</p>
            </div>
            <div class="event-food">
                <p><i class="fa-solid fa-utensils"></i> Free food: ${eventData.food ? "Yes" : "No"}</p>
            </div>
        </div>
    `;

    return article;
}

/**
 * Shows a message when no events are available
 */
function showNoEventsMessage() {
    const cardContainer = document.querySelector(".card-container");
    if (!cardContainer) return;

    const existingCard = cardContainer.querySelector(".event-card");
    if (existingCard) {
        existingCard.remove();
    }

    const noEventsCard = document.createElement("article");
    noEventsCard.className = "event-card no-events";
    noEventsCard.innerHTML = `
        <div class="event-details">
            <div class="event-header">
                <h2>No Events Available</h2>
            </div>
            <div class="event-description">
                <p>There are currently no events in the system. Check back later or browse the events page!</p>
                <a href="browse.html" style="color: #0066cc; text-decoration: underline;">Browse Events</a>
            </div>
        </div>
    `;

    cardContainer.insertBefore(
        noEventsCard,
        cardContainer.querySelector(".swipe-buttons"),
    );
}

/**
 * Shows a message when all events have been swiped
 */
function showNoMoreEventsMessage() {
    const cardContainer = document.querySelector(".card-container");
    if (!cardContainer) return;

    const existingCard = cardContainer.querySelector(".event-card");
    if (existingCard) {
        existingCard.remove();
    }

    const noMoreEventsCard = document.createElement("article");
    noMoreEventsCard.className = "event-card no-more-events";
    noMoreEventsCard.innerHTML = `
        <div class="event-details">
            <div class="event-header">
                <h2>You're All Caught Up!</h2>
            </div>
            <div class="event-description">
                <p>You've swiped through all available events. Check out your liked events or wait for new events to be posted!</p>
                <a href="liked.html" style="color: #0066cc; text-decoration: underline;">View Liked Events</a>
            </div>
        </div>
    `;

    cardContainer.insertBefore(
        noMoreEventsCard,
        cardContainer.querySelector(".swipe-buttons"),
    );
}

/**
 * Saves an event to the liked events list
 * @global
 * @param {Object} event - Event object to save
 */
function saveEventAsLiked(event) {
    if (!event) return;

    let likedEvents = fetchData("likedEvents");

    const eventId = event.id || event.name;
    const alreadyLiked = likedEvents.some(
        (liked) => (liked.id || liked.name) === eventId,
    );

    if (!alreadyLiked) {
        const eventWithTimestamp = {
            ...event,
            likedAt: new Date().toISOString(),
        };

        likedEvents.push(eventWithTimestamp);
        localStorage.setItem("likedEvents", JSON.stringify(likedEvents));
        console.log("Event saved as liked:", event.name || event.eventName);
    }
}

/**
 * Saves an event to the disliked events list
 * @global
 * @param {Object} event - Event object to save
 */
function saveEventAsDisliked(event) {
    if (!event) return;

    let dislikedEvents = fetchData("dislikedEvents");

    const eventId = event.id || event.name;
    const alreadyDisliked = dislikedEvents.some(
        (disliked) => (disliked.id || disliked.name) === eventId,
    );

    if (!alreadyDisliked) {
        const eventWithTimestamp = {
            ...event,
            dislikedAt: new Date().toISOString(),
        };

        dislikedEvents.push(eventWithTimestamp);
        localStorage.setItem("dislikedEvents", JSON.stringify(dislikedEvents));
        console.log("Event saved as disliked:", event.name || event.eventName);
    }
}

/**
 * Gets the event data for the current card being displayed
 * @global
 * @param {HTMLElement} card - The card element
 * @returns {Object|null} - Event data from localStorage or null if not found
 */
function getEventDataFromCard(card) {
    if (!card) return null;

    const eventId = card.dataset.eventId;
    if (!eventId) return null;

    const events = fetchData("events");
    return events.find((event) => (event.id || event.name) === eventId);
}
