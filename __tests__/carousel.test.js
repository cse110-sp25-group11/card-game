import {updateButtonStates} from '../website/js/carousel.js';

let previousButton, nextButton, cards;

beforeEach(() =>{
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
})

// testing if previous button properly disables
test("disables previous button when scrollLeft is at 0", ()=>{
    const previousButton = {disabled: false, style: {}};
    const nextButton = {disabled: false, style: {}};
    const cards   = {scrollLeft: 0, scrollWidth: 500, clientWidth: 200};

    updateButtonStates(previousButton, nextButton, cards);

    expect(previousButton.disabled).toBe(true);
    expect(previousButton.style.opacity).toBe("0.5");
    expect(nextButton.disabled).toBe(false);
    expect(nextButton.style.opacity).toBe("1");
})

// testing if next button properly disables
test("disables next button when scrollLeft is at the right most point", ()=>{
    const previousButton = {disabled: false, style: {}};
    const nextButton = {disabled: false, style: {}};
    const cards = {scrollLeft: 500-200, scrollWidth: 500, clientWidth: 200};

    updateButtonStates(previousButton, nextButton, cards);

    expect(nextButton.disabled).toBe(true);
    expect(nextButton.style.opacity).toBe("0.5");
    expect(previousButton.disabled).toBe(false);
    expect(previousButton.style.opacity).toBe("1");
})

// testing if both buttons work properly when not in either of edge cases
test("enables both buttons when scroll left is not at the end states", ()=>{
    const previousButton = {disabled: false, style: {}};
    const nextButton = {disabled: false, style: {}};
    const cards = {scroll: 150, scrollWidth: 500, clientWidth: 200};

    updateButtonStates(previousButton, nextButton, cards);

    expect(previousButton.disabled).toBe(false);
    expect(nextButton.disabled).toBe(false);
    expect(previousButton.style.opacity).toBe("1");
    expect(nextButton.style.opacity).toBe("1");
})