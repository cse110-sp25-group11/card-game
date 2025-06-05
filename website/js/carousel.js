/**
 * @fileoverview Carousel navigation functionality for Campus Swipe browse page
 * Handles prev/next button interactions and smooth scrolling
 */

/**
 * Initializes carousel navigation for all carousels on the page
 */
function initializeCarousels() {
    const carousels = document.querySelectorAll(".event-carousel");

    carousels.forEach((carousel, index) => {
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");
        const eventCards = carousel.querySelector(".event-cards");

        if (!prevBtn || !nextBtn || !eventCards) {
            console.warn(`Carousel ${index} missing required elements`);
            return;
        }

        setupCarouselNavigation(prevBtn, nextBtn, eventCards);

        updateButtonStates(prevBtn, nextBtn, eventCards);

        eventCards.addEventListener("scroll", () => {
            updateButtonStates(prevBtn, nextBtn, eventCards);
        });
    });
}

/**
 * Sets up navigation event listeners for a carousel
 * @param {HTMLElement} prevBtn - Previous button element
 * @param {HTMLElement} nextBtn - Next button element
 * @param {HTMLElement} eventCards - Event cards container element
 */
function setupCarouselNavigation(prevBtn, nextBtn, eventCards) {
    const scrollAmount = 320; // Width of one card plus gap

    prevBtn.addEventListener("click", () => {
        eventCards.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
        });
    });

    nextBtn.addEventListener("click", () => {
        eventCards.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    });
}
/**
 * Initializes the toggle functionality for past events section
 */
function initializePastEventsToggle() {
    const toggleBtn = document.getElementById('togglePastEvents');
    const pastEventsCarousel = document.getElementById('pastEventsCarousel');
    const toggleText = toggleBtn?.querySelector('.toggle-text');
    const toggleIcon = toggleBtn?.querySelector('.toggle-icon');

    if (!toggleBtn || !pastEventsCarousel || !toggleText || !toggleIcon) {
        console.warn('Past events toggle elements not found');
        return;
    }

    let isExpanded = false;

    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Show the carousel
            pastEventsCarousel.style.display = 'flex';
            toggleText.textContent = 'Hide Events';
            toggleBtn.setAttribute('aria-expanded', 'true');
            
            // Add smooth slide-down animation
            pastEventsCarousel.style.opacity = '0';
            pastEventsCarousel.style.transform = 'translateY(-20px)';
            
            // Force reflow then animate
            setTimeout(() => {
                pastEventsCarousel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                pastEventsCarousel.style.opacity = '1';
                pastEventsCarousel.style.transform = 'translateY(0)';
            }, 10);
            
            // Re-initialize carousel for past events when shown
            setTimeout(() => {
                initializeCarousels();
            }, 100);
            
        } else {
            // Hide the carousel
            pastEventsCarousel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            pastEventsCarousel.style.opacity = '0';
            pastEventsCarousel.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                pastEventsCarousel.style.display = 'none';
                pastEventsCarousel.style.transition = '';
            }, 300);
            
            toggleText.textContent = 'Show Events';
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Set initial ARIA attributes
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', 'pastEventsCarousel');
}

/**
 * Updates the visual state of navigation buttons based on scroll position
 * @param {HTMLElement} prevBtn - Previous button element
 * @param {HTMLElement} nextBtn - Next button element
 * @param {HTMLElement} eventCards - Event cards container element
 */
function updateButtonStates(prevBtn, nextBtn, eventCards) {
    const scrollLeft = eventCards.scrollLeft;
    const maxScrollLeft = eventCards.scrollWidth - eventCards.clientWidth;

    // Update previous button state
    if (scrollLeft <= 0) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = "0.5";
        prevBtn.style.cursor = "not-allowed";
    } else {
        prevBtn.disabled = false;
        prevBtn.style.opacity = "1";
        prevBtn.style.cursor = "pointer";
    }

    // Update next button state
    if (scrollLeft >= maxScrollLeft - 1) {
        // -1 for rounding errors
        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";
        nextBtn.style.cursor = "not-allowed";
    } else {
        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
    }
}

/**
 * Handles keyboard navigation for carousels
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyboardNavigation(event) {
    if (event.target.closest(".event-carousel")) {
        const carousel = event.target.closest(".event-carousel");
        const eventCards = carousel.querySelector(".event-cards");
        const scrollAmount = 320;

        switch (event.key) {
            case "ArrowLeft":
                event.preventDefault();
                eventCards.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth",
                });
                break;
            case "ArrowRight":
                event.preventDefault();
                eventCards.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                });
                break;
        }
    }
}

/**
 * Adds touch/swipe support for mobile devices
 * @param {HTMLElement} eventCards - Event cards container element
 */
function addTouchSupport(eventCards) {
    let startX = 0;
    let scrollStart = 0;
    let isDown = false;

    eventCards.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - eventCards.offsetLeft;
        scrollStart = eventCards.scrollLeft;
        eventCards.style.cursor = "grabbing";
    });

    eventCards.addEventListener("mouseleave", () => {
        isDown = false;
        eventCards.style.cursor = "grab";
    });

    eventCards.addEventListener("mouseup", () => {
        isDown = false;
        eventCards.style.cursor = "grab";
    });

    eventCards.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - eventCards.offsetLeft;
        const walk = (x - startX) * 2;
        eventCards.scrollLeft = scrollStart - walk;
    });

    // Touch events for mobile
    eventCards.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX;
        scrollStart = eventCards.scrollLeft;
    });

    eventCards.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX;
        const walk = (startX - x) * 2;
        eventCards.scrollLeft = scrollStart + walk;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        initializeCarousels();
        initializePastEventsToggle();

        document.addEventListener("keydown", handleKeyboardNavigation);

        const eventCardsContainers = document.querySelectorAll(".event-cards");
        eventCardsContainers.forEach(addTouchSupport);
    }, 100);
});

document.addEventListener("eventsLoaded", () => {
    initializeCarousels();
});
