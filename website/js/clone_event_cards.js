/**  clone_event_cards.js
 * Dynamically clones <event-card> components based on stored event data 
 * and injects them into the `.event-cards` container on the browse page.
 */

window.addEventListener('DOMContentLoaded', () => {
    // Grabs all the .event-cards containers on the page
    const carousels = document.querySelectorAll('.event-carousel .event-cards');
    if(!carousels.length) { 
        console.error('No .event-cards containers found.');
        return;
    }

    // Load events source 
    let events = [];
    
}
