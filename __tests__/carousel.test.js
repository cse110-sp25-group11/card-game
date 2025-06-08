import {
    initializeCarousels,
    initializePastEventsToggle,
    updateButtonStates,
} from "../website/js/carousel.js";

let previousButton, nextButton, cards;

beforeEach(() => {
    document.body.innerHTML = `
        <button class="prev">Prev</button>
        <button class="next">Next</button>
        <div class="event-cards" style="overflow:auto;width:200px">
        <div style="width:500px;height:1px"></div>
        </div>
    `;

    // getting the buttons
    previousButton = document.querySelector(".prev");
    nextButton = document.querySelector(".next");
    cards = document.querySelector(".event-cards");
});

// testing if previous button properly disables
test("disables previous button when scrollLeft is at 0", () => {
    const previousButton = { disabled: false, style: {} };
    const nextButton = { disabled: false, style: {} };
    const cards = { scrollLeft: 0, scrollWidth: 500, clientWidth: 200 };

    updateButtonStates(previousButton, nextButton, cards);

    expect(previousButton.disabled).toBe(true);
    expect(previousButton.style.opacity).toBe("0.5");
    expect(nextButton.disabled).toBe(false);
    expect(nextButton.style.opacity).toBe("1");
});

// testing if next button properly disables
test("disables next button when scrollLeft is at the right most point", () => {
    const previousButton = { disabled: false, style: {} };
    const nextButton = { disabled: false, style: {} };
    const cards = { scrollLeft: 500 - 200, scrollWidth: 500, clientWidth: 200 };

    updateButtonStates(previousButton, nextButton, cards);

    expect(nextButton.disabled).toBe(true);
    expect(nextButton.style.opacity).toBe("0.5");
    expect(previousButton.disabled).toBe(false);
    expect(previousButton.style.opacity).toBe("1");
});

// testing if both buttons work properly when not in either of edge cases
test("enables both buttons when scroll left is not at the end states", () => {
    const previousButton = { disabled: false, style: {} };
    const nextButton = { disabled: false, style: {} };
    const cards = { scroll: 150, scrollWidth: 500, clientWidth: 200 };

    updateButtonStates(previousButton, nextButton, cards);

    expect(previousButton.disabled).toBe(false);
    expect(nextButton.disabled).toBe(false);
    expect(previousButton.style.opacity).toBe("1");
    expect(nextButton.style.opacity).toBe("1");
});

// adding testing for the past events
const pastEvents = `
    <button id="togglePastEvents">
        <span class="toggle-text">Show Events</span>
        <span class="toggle-icon"></span>
    </button>
    <div id="pastEventsCarousel" style="display:none"></div>
`;

test("if the initializePastEventsToggle sets correct ARIA attributes or not", () => {
    document.body.innerHTML = pastEvents;

    initializePastEventsToggle();

    const button = document.getElementById("togglePastEvents");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.getAttribute("aria-controls")).toBe("pastEventsCarousel");
});

test("togglePastEvents button click shows then hides the carousel", () => {
    document.body.innerHTML = pastEvents;
    initializePastEventsToggle();

    const button = document.getElementById("togglePastEvents");
    const carousel = document.getElementById("pastEventsCarousel");
    const text = button.querySelector(".toggle-text");

    // first click should show
    button.click();
    expect(carousel.style.display).toBe("flex");
    expect(carousel.style.opacity).toBe("0");
    expect(carousel.style.transform).toBe("translateY(-20px)");
    expect(text.textContent).toBe("Hide Events");
    expect(button.getAttribute("aria-expanded")).toBe("true");

    // second click should hide
    button.click();
    expect(text.textContent).toBe("Show Events");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(carousel.style.opacity).toBe("0");
    expect(carousel.style.transform).toBe("translateY(-20px)");
});
