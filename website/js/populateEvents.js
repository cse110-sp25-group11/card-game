/**
 * Generates sample events for different categories with proper dates
 * @returns {Object} Object containing arrays of events for each category
 */
export function generateSampleEvents() {
    const now = new Date();
    const today = new Date(now);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Helper function to format date as MM/DD/YYYY
    function formatDate(date) {
        return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`;
    }

    // Helper function to format time as HH:MM
    function formatTime(hour, minute = 0) {
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    }

    const organizations = [
        "Computer Science Club",
        "Student Government",
        "Drama Society",
        "Environmental Club",
        "Photography Club",
        "Debate Team",
        "Music Society",
        "Art Club",
        "Sports Club",
        "Book Club",
    ];

    const locations = [
        "Student Union Building",
        "Library Auditorium",
        "Campus Quad",
        "Science Building Room 101",
        "Gymnasium",
        "Cafeteria",
        "Art Studio",
        "Music Hall",
        "Conference Room A",
        "Outdoor Pavilion",
    ];

    const eventTypes = [
        "Workshop",
        "Seminar",
        "Social Event",
        "Competition",
        "Meeting",
        "Performance",
        "Exhibition",
        "Fundraiser",
        "Study Session",
        "Networking Event",
    ];

    const images = [
        // Workshop
        "https://images.unsplash.com/photo-1552664730-d307ca884978?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D",

        // Seminar
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3nhwunZbexBzJb-lM4Kp8_g4nW9O4YItjjg&s",

        // Social event
        "https://today.ucsd.edu/news_uploads/fall-preview-1.jpg",

        // Competition
        "https://today.ucsd.edu/news_uploads/steel_bridge_competition_secondary_shot_.jpg",

        // Meeting
        "https://universitycenters.ucsd.edu/_images/reservation-images/MCR_0.jpg",

        // Preformance
        "https://cdn.kpbs.org/dims4/default/dc09096/2147483647/strip/true/crop/1336x701+0+0/resize/1200x630!/quality/90/?url=http%3A%2F%2Fkpbs-brightspot.s3.us-west-2.amazonaws.com%2Fe3%2Fc8%2F93321a0a41ada1483e2135c1a232%2Famphitheater-ucsandiegoerikjepsen7.jpg",

        // Exhibition
        "https://visarts.ucsd.edu/_images/homepage-v5/home_MFA-1_550x370.jpg",

        // Fundraiser
        "https://mapsatucsd.weebly.com/uploads/9/5/1/7/95170948/img-1420_orig.png",

        // Study Session
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ69djgk42ZTW5CGF5zHJ-uapmAHp24e_Jl3A&s",

        // Networking Event
        "https://sdchamber.org/wp-content/uploads/2021/09/Chamber-IMG_5319-Photo-by-Melissa-Jacobs-scaled.jpg",
    ];

    // Events happening now (today)
    const happeningNow = [];
    for (let i = 1; i <= 5; i++) {
        const startHour = Math.floor(Math.random() * 6) + 10; // 10 AM to 3 PM
        const endHour = startHour + Math.floor(Math.random() * 3) + 1; // 1-4 hours later
        const eventType = Math.floor(Math.random() * eventTypes.length);
        happeningNow.push({
            name: `${eventTypes[eventType]} ${i}`,
            description: `Join us for an exciting ${eventTypes[eventType].toLowerCase()} that will enhance your college experience. This event features interactive activities, networking opportunities, and valuable learning experiences.`,
            date: formatDate(today),
            org: organizations[
                Math.floor(Math.random() * organizations.length)
            ],
            imgLink: images[eventType],
            imgAltText: `Event ${i} promotional image`,
            location: locations[Math.floor(Math.random() * locations.length)],
            food: Math.random() > 0.5,
            startTime: formatTime(startHour),
            endTime: formatTime(endHour),
            category: "happening-now",
        });
    }

    // Upcoming events (tomorrow to next month)
    const upcomingEvents = [];
    for (let i = 1; i <= 5; i++) {
        const eventDate = new Date(tomorrow);
        eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 30)); // Random date in next 30 days
        const startHour = Math.floor(Math.random() * 12) + 9; // 9 AM to 8 PM
        const endHour = startHour + Math.floor(Math.random() * 4) + 1; // 1-5 hours later
        const eventType = Math.floor(Math.random() * eventTypes.length);
        upcomingEvents.push({
            name: `Upcoming ${eventTypes[eventType]} ${i}`,
            description: `Don't miss this upcoming ${eventTypes[eventType].toLowerCase()}! We have planned an amazing experience with guest speakers, hands-on activities, and opportunities to connect with fellow students.`,
            date: formatDate(eventDate),
            org: organizations[
                Math.floor(Math.random() * organizations.length)
            ],
            imgLink: images[eventType],
            imgAltText: `Upcoming Event ${i} promotional image`,
            location: locations[Math.floor(Math.random() * locations.length)],
            food: Math.random() > 0.5,
            startTime: formatTime(startHour),
            endTime: formatTime(Math.min(endHour, 23)),
            category: "upcoming",
        });
    }

    // Popular events (mix of dates, marked as popular)
    const popularEvents = [];
    for (let i = 1; i <= 5; i++) {
        const eventDate = new Date(today);
        eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 14)); // Random date in next 2 weeks
        const startHour = Math.floor(Math.random() * 10) + 10; // 10 AM to 7 PM
        const endHour = startHour + Math.floor(Math.random() * 3) + 2; // 2-5 hours later
        const eventType = Math.floor(Math.random() * eventTypes.length);

        popularEvents.push({
            name: `Popular ${eventTypes[eventType]} ${i}`,
            description: `This is one of our most popular events! Join hundreds of students for this amazing ${eventTypes[eventType].toLowerCase()}. Features include live entertainment, prizes, and unforgettable memories.`,
            date: formatDate(eventDate),
            org: organizations[
                Math.floor(Math.random() * organizations.length)
            ],
            imgLink: images[eventType],
            imgAltText: `Popular Event ${i} promotional image`,
            location: locations[Math.floor(Math.random() * locations.length)],
            food: Math.random() > 0.3, // Higher chance of food for popular events
            startTime: formatTime(startHour),
            endTime: formatTime(Math.min(endHour, 23)),
            category: "popular",
        });
    }

    return {
        happeningNow,
        upcomingEvents,
        popularEvents,
    };
}

/**
 * Populates localStorage with sample events for all categories
 */
export function populateEvents() {
    try {
        const events = generateSampleEvents();

        localStorage.setItem(
            "happening-now-events",
            JSON.stringify(events.happeningNow),
        );
        localStorage.setItem(
            "upcoming-events",
            JSON.stringify(events.upcomingEvents),
        );
        localStorage.setItem(
            "popular-events",
            JSON.stringify(events.popularEvents),
        );

        const allEvents = [
            ...events.happeningNow,
            ...events.upcomingEvents,
            ...events.popularEvents,
        ];

        localStorage.setItem("events", JSON.stringify(allEvents));

        console.log("Events populated successfully");
        console.log("Happening Now:", events.happeningNow);
        console.log("Upcoming Events:", events.upcomingEvents);
        console.log("Popular Events:", events.popularEvents);
    } catch (error) {
        console.error("Error populating events:", error);
    }
}
