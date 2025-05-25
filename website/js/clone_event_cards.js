/**  clone_event_cards.js
 * Dynamically clones <event-card> components based on stored event data 
 * and injects them into the `.event-cards` container on the browse page.
 */

window.addEventListener('DOMContentLoaded', () => {
    // Grabs all the .event-cards containers on the page
    const containers = document.querySelectorAll('.event-cards');
    if(!containers.length) { 
        console.error('No .event-cards containers found.');
        return;
    }

    // Load events source 
    const events = [
        {
            universalId: 'event-001',
            name: 'Spring Festival',
            description: 'Celebrate spring with food and music!',
            date: '2025-04-15',
            org: 'Campus Life',
            imgLink: 'img/springfest.jpg',
            imgAlt: 'Spring Festival Flyer',
            location: 'Main Quad',
            food: true,
            startTime: '12:00',
            endTime: '16:00'
        },
        {
            universalId: 'event-002',
            name: 'Tech Talk',
            description: 'Learn about AI advancements.',
            date: '2025-05-01',
            org: 'Tech Club',
            imgLink: 'img/techtalk.jpg',
            imgAlt: 'Tech Talk Poster',
            location: 'Room 101',
            food: false,
            startTime: '18:00',
            endTime: '20:00'
        }
    ];

    const template = document.getElementById('event-card-template');
    if (!template) {
        console.error('No event card template found.');
        return;
    }

    containers.forEach((container, containerIdx) => {
        container.innerHTML = '';
        events.forEach((event, idx) => {
            const clone = template.content.cloneNode(true);
            const card = clone.querySelector('event-card');
            if (!card) return;
            card.id = `event-card-${containerIdx}-${idx}`;
            card.setAttribute('data-universal-id', event.universalId);
            card.data = event; // Uses the EventCard's set data()
            container.appendChild(clone);
        });
    });
});

    

