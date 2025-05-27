/**
 * Debug utility for populating localStorage with sample events
 * This file should only be loaded on the debug page
 */

/**
 * Generates sample events for different categories with proper dates
 * @returns {Object} Object containing arrays of events for each category
 */
function generateSampleEvents() {
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
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  // Helper function to format time as HH:MM
  function formatTime(hour, minute = 0) {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  const organizations = [
    "Computer Science Club", "Student Government", "Drama Society", "Environmental Club", 
    "Photography Club", "Debate Team", "Music Society", "Art Club", "Sports Club", "Book Club"
  ];

  const locations = [
    "Student Union Building", "Library Auditorium", "Campus Quad", "Science Building Room 101",
    "Gymnasium", "Cafeteria", "Art Studio", "Music Hall", "Conference Room A", "Outdoor Pavilion"
  ];

  const eventTypes = [
    "Workshop", "Seminar", "Social Event", "Competition", "Meeting", "Performance", 
    "Exhibition", "Fundraiser", "Study Session", "Networking Event"
  ];

  // Events happening now (today)
  const happeningNow = [];
  for (let i = 1; i <= 5; i++) {
    const startHour = Math.floor(Math.random() * 6) + 10; // 10 AM to 3 PM
    const endHour = startHour + Math.floor(Math.random() * 3) + 1; // 1-4 hours later
    
    happeningNow.push({
      name: `${eventTypes[Math.floor(Math.random() * eventTypes.length)]} ${i}`,
      description: `Join us for an exciting ${eventTypes[Math.floor(Math.random() * eventTypes.length)].toLowerCase()} that will enhance your college experience. This event features interactive activities, networking opportunities, and valuable learning experiences.`,
      date: formatDate(today),
      org: organizations[Math.floor(Math.random() * organizations.length)],
      imgLink: `https://placehold.co/400x300/0066cc/ffffff?text=Event+${i}`,
      imgAltText: `Event ${i} promotional image`,
      location: locations[Math.floor(Math.random() * locations.length)],
      food: Math.random() > 0.5,
      startTime: formatTime(startHour),
      endTime: formatTime(endHour),
      category: "happening-now"
    });
  }

  // Upcoming events (tomorrow to next month)
  const upcomingEvents = [];
  for (let i = 1; i <= 5; i++) {
    const eventDate = new Date(tomorrow);
    eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 30)); // Random date in next 30 days
    const startHour = Math.floor(Math.random() * 12) + 9; // 9 AM to 8 PM
    const endHour = startHour + Math.floor(Math.random() * 4) + 1; // 1-5 hours later
    
    upcomingEvents.push({
      name: `Upcoming ${eventTypes[Math.floor(Math.random() * eventTypes.length)]} ${i}`,
      description: `Don't miss this upcoming ${eventTypes[Math.floor(Math.random() * eventTypes.length)].toLowerCase()}! We have planned an amazing experience with guest speakers, hands-on activities, and opportunities to connect with fellow students.`,
      date: formatDate(eventDate),
      org: organizations[Math.floor(Math.random() * organizations.length)],
      imgLink: `https://placehold.co/400x300/009900/ffffff?text=Upcoming+${i}`,
      imgAltText: `Upcoming Event ${i} promotional image`,
      location: locations[Math.floor(Math.random() * locations.length)],
      food: Math.random() > 0.5,
      startTime: formatTime(startHour),
      endTime: formatTime(Math.min(endHour, 23)),
      category: "upcoming"
    });
  }

  // Popular events (mix of dates, marked as popular)
  const popularEvents = [];
  for (let i = 1; i <= 5; i++) {
    const eventDate = new Date(today);
    eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 14)); // Random date in next 2 weeks
    const startHour = Math.floor(Math.random() * 10) + 10; // 10 AM to 7 PM
    const endHour = startHour + Math.floor(Math.random() * 3) + 2; // 2-5 hours later
    
    popularEvents.push({
      name: `Popular ${eventTypes[Math.floor(Math.random() * eventTypes.length)]} ${i}`,
      description: `This is one of our most popular events! Join hundreds of students for this amazing ${eventTypes[Math.floor(Math.random() * eventTypes.length)].toLowerCase()}. Features include live entertainment, prizes, and unforgettable memories.`,
      date: formatDate(eventDate),
      org: organizations[Math.floor(Math.random() * organizations.length)],
      imgLink: `https://placehold.co/400x300/cc6600/ffffff?text=Popular+${i}`,
      imgAltText: `Popular Event ${i} promotional image`,
      location: locations[Math.floor(Math.random() * locations.length)],
      food: Math.random() > 0.3, // Higher chance of food for popular events
      startTime: formatTime(startHour),
      endTime: formatTime(Math.min(endHour, 23)),
      category: "popular"
    });
  }

  return {
    happeningNow,
    upcomingEvents,
    popularEvents
  };
}

/**
 * Populates localStorage with sample events for all categories
 */
function populateEvents() {
  try {
    const events = generateSampleEvents();
    
    localStorage.setItem('happening-now-events', JSON.stringify(events.happeningNow));
    localStorage.setItem('upcoming-events', JSON.stringify(events.upcomingEvents));
    localStorage.setItem('popular-events', JSON.stringify(events.popularEvents));
    
    const allEvents = [...events.happeningNow, ...events.upcomingEvents, ...events.popularEvents];
    localStorage.setItem('all-events', JSON.stringify(allEvents));
    
    localStorage.setItem('events', JSON.stringify(allEvents));
    
    showStatusMessage('Successfully populated localStorage with 15 sample events (5 per category)!', 'success');
    showEventCounts();
    
    console.log('Debug: Events populated successfully');
    console.log('Happening Now:', events.happeningNow);
    console.log('Upcoming Events:', events.upcomingEvents);
    console.log('Popular Events:', events.popularEvents);
    
  } catch (error) {
    showStatusMessage(`Error populating events: ${error.message}`, 'error');
    console.error('Error populating events:', error);
  }
}

/**
 * Clears all events from localStorage
 */
function clearEvents() {
  try {
    localStorage.removeItem('happening-now-events');
    localStorage.removeItem('upcoming-events');
    localStorage.removeItem('popular-events');
    localStorage.removeItem('all-events');
    localStorage.removeItem('events');
    localStorage.removeItem('liked-events');
    localStorage.removeItem('disliked-events');
    
    showStatusMessage('All events cleared from localStorage!', 'success');
    showEventCounts();
    
    console.log('Debug: All events cleared from localStorage');
    
  } catch (error) {
    showStatusMessage(`Error clearing events: ${error.message}`, 'error');
    console.error('Error clearing events:', error);
  }
}

/**
 * Shows current event counts in localStorage
 */
function showEventCounts() {
  try {
    const happeningNow = JSON.parse(localStorage.getItem('happening-now-events') || '[]');
    const upcoming = JSON.parse(localStorage.getItem('upcoming-events') || '[]');
    const popular = JSON.parse(localStorage.getItem('popular-events') || '[]');
    const all = JSON.parse(localStorage.getItem('events') || '[]');
    const liked = JSON.parse(localStorage.getItem('liked-events') || '[]');
    const disliked = JSON.parse(localStorage.getItem('disliked-events') || '[]');
    
    const countsHtml = `
      <h3>Current Event Counts:</h3>
      <ul style="text-align: left; display: inline-block;">
        <li>Happening Now: ${happeningNow.length} events</li>
        <li>Upcoming Events: ${upcoming.length} events</li>
        <li>Popular Events: ${popular.length} events</li>
        <li>All Events: ${all.length} events</li>
        <li>Liked Events: ${liked.length} events</li>
        <li>Disliked Events: ${disliked.length} events</li>
      </ul>
    `;
    
    document.getElementById('eventCounts').innerHTML = countsHtml;
    
  } catch (error) {
    document.getElementById('eventCounts').innerHTML = `<p style="color: #f44336;">Error reading event counts: ${error.message}</p>`;
    console.error('Error showing event counts:', error);
  }
}

/**
 * Shows status message to user
 * @param {string} message - The message to display
 * @param {string} type - The type of message ('success' or 'error')
 */
function showStatusMessage(message, type) {
  const statusDiv = document.getElementById('statusMessage');
  statusDiv.innerHTML = `<div class="status-message ${type}">${message}</div>`;
  
  setTimeout(() => {
    statusDiv.innerHTML = '';
  }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
  showEventCounts();
  console.log('Debug utilities loaded. Access via /debug');
}); 